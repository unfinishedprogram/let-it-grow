import { AnimatedSprite, Container } from "pixi.js";
import json from "../../public/assets/json-spritesheets/slimes/slime_down.json";
import { Collidable, ENEMY_MASK, PLANT_MASK, PLAYER_MASK } from "./collidable";
import { V2, Vec2 } from "../utils/vec2";
import World, { islandBounds } from "../world";
import { isFightable, loadSpriteSheet } from "../utils/util";
import { Combatible, CombatSystem } from "./combatable";
import { HitNumber } from "../hitNumber";
import inventory from "../items/inventory";
import day from "../day";
import { keepIn } from "../utils/bbox";
import { sound } from "@pixi/sound";
import { Nexus } from "../Nexus";

sound.add('hitmarker', '/assets/hitmarker.mp3');

enum EnemyState {
  FOLLOWING_PLAYER,
  ATTACKING_PLAYER,
  ATTACKING_PLANT,
  IS_RESTING,
  GOING_FOR_NEXUS,
  GOING_FOR_PLANT,
}

export const slimeSprite = await loadSpriteSheet(
  json,
  "/assets/json-spritesheets/slimes/",
  0.15
);

export class Enemy implements Combatible {
  id: string;
  is_collidable: true = true;
  is_fightable = true;
  is_dynamic: true = true;
  velocity: Vec2 = { x: 0, y: 0 };
  radius: number = 6;
  mass: number = 1;
  collision_mask: number = ENEMY_MASK;
  speed: number = 0.4;
  target: Combatible | null = null;
  plantTarget: Combatible | null = null;
  container = new Container();
  drag = 0.2 + day.inGameDays * 0.1;

  state = EnemyState.GOING_FOR_NEXUS;

  combatSystem: CombatSystem = {
    maxHP: 20 + day.inGameDays * 1.2,
    hp: 20 + day.inGameDays * 1.2,
    damage: 10 + day.inGameDays * 1.2,
    radius: 5 + day.inGameDays * 1.2,
    rechargeTime: 1000 - day.inGameDays * 1.2,
    isRecharging: false,
  };

  onCollision(_other: Collidable) { }

  onHit(combatible: Combatible) {
    sound.play('hitmarker');
    sound.volume('hitmarker', 1);
    this.combatSystem.hp -= combatible.combatSystem.damage;

    World.addEntity(
      new HitNumber(
        combatible.combatSystem.damage.toString(),
        this.sprite.position,
        "red"
      )
    );
    if (this.combatSystem.hp < 0) {
      const money = ((Math.random() * 5) | 0) + 1;

      const position = {
        x: this.sprite.position.x,
        y: this.sprite.position.y - 20,
      };

      World.addEntity(new HitNumber(money.toString(), position, "yellow", 32));
      inventory.addGold(money);
      World.removeEntity(this.id);
    }
  }

  constructor(
    public sprite: AnimatedSprite,
    public enemyDetectionRangeInner: number,
    public enemyDetectionRangeOutter: number
  ) {
    this.sprite.addChild(this.container);
    this.sprite.position.x +=
      Math.random() * (islandBounds.max.x - islandBounds.min.x) +
      islandBounds.min.x;
    // this.sprite.position.y += Math.random() * (islandBounds.max.y - islandBounds.min.y) + islandBounds.min.y;
    this.sprite.position.y += 100000;
    keepIn(this, islandBounds);
    // keepIn(this, islandBounds);
    this.id = crypto.randomUUID();
  }

  findOpponent() {
    for (let [_id, entity] of World.entities) {
      if (isFightable(entity)) {
        if (entity.collision_mask == PLAYER_MASK) {
          if (this.isInRange(entity, this.enemyDetectionRangeInner)) {
            this.target = entity;
          }
        }
      }
    }
  }

  findPlant() {
    console.log("Find plant!");
    for (let entity of World.garden.tiles) {
      if (!entity.plant) return;
      console.log(entity);
      if (isFightable(entity)) {
        if (entity.collision_mask == PLANT_MASK) {
          if (this.isInRange(entity, this.enemyDetectionRangeInner)) {
            this.plantTarget = entity;
          }
        }
      }
    }
  }

  isInRange(c: Collidable, range: number): boolean {
    return (
      V2.distance(this.sprite.position, c.sprite.position) < range + c.radius
    );
  }

  // The enemy can only transition to following player (if he gets out of range)
  // Or RESTING if it attacks
  attackingPlayerScenario() {
    if (!this.isInRange(this.target!, this.combatSystem.radius)) {
      this.state = EnemyState.FOLLOWING_PLAYER;
      return;
    }
    this.attackAndRest(this.target!);
  }

  attackingPlantScenario() {
    if (!this.isInRange(this.plantTarget!, this.combatSystem.radius)) {
      this.state = EnemyState.GOING_FOR_PLANT;
      return;
    }
    this.attackAndRest(this.plantTarget!);
  }

  attackAndRest(target: Combatible) {
    this.combatSystem.isRecharging = true;
    target?.onHit(this);
    this.state = EnemyState.IS_RESTING;
    setTimeout(
      () => (this.combatSystem.isRecharging = false),
      this.combatSystem.rechargeTime
    );

  }

  followingPlayerScenario() {
    if (
      !this.target ||
      !this.isInRange(this.target, this.enemyDetectionRangeOutter)
    ) {
      this.state = EnemyState.GOING_FOR_NEXUS;
      this.target = null;
      return;
    }

    if (this.isInRange(this.target, this.combatSystem.radius)) {
      this.state = EnemyState.ATTACKING_PLAYER;
      return;
    }

    const normalizedVelocity = V2.normalized(
      V2.sub(this.target.sprite.position, this.sprite.position)
    );

    V2.addAssign(
      this.velocity,
      V2.multiplyScalar(
        normalizedVelocity,
        this.speed * this.sprite.currentFrame
      )
    );
  }

  goingForNexusScenario() {
    this.findOpponent();
    if (this.target) {
      this.state = EnemyState.FOLLOWING_PLAYER;
      return;
    }

    this.findPlant();
    if (this.plantTarget) {
      this.state = EnemyState.GOING_FOR_PLANT;
      return;
    }

    const nexus: Nexus = World.entities.get("Nexus") as any;

    const normalizedVelocity = V2.normalized(
      V2.sub(nexus.sprite.position, this.sprite.position)
    );

    if (this.isInRange(nexus as any, 20)) {
      World.removeEntity(this.id);
      nexus.health -= this.combatSystem.damage;
      return;
    }

    V2.addAssign(
      this.velocity,
      V2.multiplyScalar(normalizedVelocity, this.speed * this.sprite.currentFrame)
    );
  }

  goingForPlantScenario() {
    this.findPlant();
    if (
      !this.plantTarget ||
      !this.isInRange(this.plantTarget, this.enemyDetectionRangeOutter)
    ) {
      this.state = EnemyState.GOING_FOR_NEXUS;
      this.plantTarget = null;
      return;
    }

    if (this.isInRange(this.plantTarget, this.combatSystem.radius)) {
      this.state = EnemyState.ATTACKING_PLANT;
      return;
    }

    const normalizedVelocity = V2.normalized(
      V2.sub(this.plantTarget.sprite.position, this.sprite.position)
    );

    V2.addAssign(
      this.velocity,
      V2.multiplyScalar(
        normalizedVelocity,
        this.speed * this.sprite.currentFrame
      )
    );

  }

  step(_dt: number): void {
    const nexus: Nexus = World.entities.get("Nexus") as any;
    if (this.isInRange(nexus as any, 30)) {
      World.removeEntity(this.id);
      nexus.health -= this.combatSystem.damage;
      return;
    }

    switch (this.state) {
      case EnemyState.GOING_FOR_NEXUS:
        this.goingForNexusScenario();
        break;
      case EnemyState.FOLLOWING_PLAYER:
        this.followingPlayerScenario();
        break;
      case EnemyState.ATTACKING_PLAYER:
        this.attackingPlayerScenario();
        break;
      case EnemyState.IS_RESTING:
        if (this.combatSystem.isRecharging == false) {
          this.state = EnemyState.GOING_FOR_NEXUS;
        }
        break;
      case EnemyState.GOING_FOR_PLANT:
        this.goingForPlantScenario();
        break;
      case EnemyState.ATTACKING_PLANT:
        this.attackingPlantScenario();
        break;
    }
  }
}
