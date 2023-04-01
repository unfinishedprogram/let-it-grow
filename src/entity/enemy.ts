import { AnimatedSprite, Container, Text } from "pixi.js";
import json from "../../public/assets/json-spritesheets/slimes/slime_down.json";
import { Collidable, ENEMY_MASK, PLAYER_MASK } from "./collidable";
import { V2, Vec2 } from "../utils/vec2";
import World, { islandBounds } from "../world";
import { isFightable, loadSpriteSheet } from "../utils/util";
import { Combatible, CombatSystem } from "./combatable";
import { HitNumber } from "../hitNumber";
import inventory from "../items/inventory";
import day from "../day";
import { keepIn } from "../utils/bbox";
import { sound } from "@pixi/sound";

sound.add('hitmarker', '/assets/hitmarker.mp3');

enum EnemyState {
  FOLLOWING_PLAYER,
  ATTACKING_PLAYER,
  IS_RESTING,
  GOING_FOR_NEXUS,
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

  onCollision(other: Collidable) {}

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

    this.combatSystem.isRecharging = true;
    this.target?.onHit(this);
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

    const middleOfIslandX = islandBounds.min.x + islandBounds.max.x / 2;
    const middleOfIslandY = islandBounds.min.y + islandBounds.max.y / 2;
    const normalized = V2.normalized(
      V2.sub({ x: middleOfIslandX, y: middleOfIslandY }, this.sprite.position)
    );

    V2.addAssign(
      this.velocity,
      V2.multiplyScalar(normalized, this.speed * this.sprite.currentFrame)
    );
  }

  step(dt: number): void {
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
    }
  }
}
