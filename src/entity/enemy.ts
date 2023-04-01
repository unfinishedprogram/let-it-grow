import { AnimatedSprite, Container, Text } from "pixi.js";
import json from "../../public/assets/json-spritesheets/slimes/slime_down.json";
import { Collidable, ENEMY_MASK, PLAYER_MASK } from "./collidable";
import { V2, Vec2 } from "../utils/vec2";
import World from "../world";
import { isFightable, loadSpriteSheet } from "../utils/util";
import { Combatible, CombatSystem } from "./combatable";

enum EnemyState {
  FOLLOWING_PLAYER,
  ATTACKING_PLAYER,
  IS_RESTING,
  GOING_FOR_NEXUS,
}

class Enemy implements Combatible {
  id = crypto.randomUUID();
  is_collidable: true = true;
  is_fightable = true;
  is_dynamic: true = true;
  velocity: Vec2 = {x: 0, y: 0};
  radius: number = 1;
  mass: number = 1;
  collision_mask: number = ENEMY_MASK;
  speed: number = 0.4;
  target: Combatible | null = null;
  container = new Container();
  debugText = new Text('test text', {fill: 'white', fontSize: '1rem'});

  state = EnemyState.GOING_FOR_NEXUS;

  combatSystem: CombatSystem = {
    maxHP: 20,
    hp: 20,
    damage: 10,
    radius: 5,
    rechargeTime: 1000,
    isRecharging: false,
  }

  onCollision(other: Collidable) {
  }

  onHit(combatible: Combatible) {};

  constructor(public sprite: AnimatedSprite, public enemyDetectionRangeInner: number, public enemyDetectionRangeOutter: number) {
    this.container.addChild(this.debugText);
    this.sprite.addChild(this.container);
    this.debugText.anchor.set(0.5, 1);
  }

  findOpponent(){ 
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
    return V2.distance(this.sprite.position, c.sprite.position) < range + c.radius;
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
    setTimeout(() => this.combatSystem.isRecharging = false, this.combatSystem.rechargeTime);
  }

  followingPlayerScenario() {
    if (!this.target || !this.isInRange(this.target, this.enemyDetectionRangeOutter)) {
      this.state = EnemyState.GOING_FOR_NEXUS;
      this.target = null;
      return;
    }

    if (this.isInRange(this.target, this.combatSystem.radius)) {
      this.state = EnemyState.ATTACKING_PLAYER;
      return;
    }

    const normalizedVelocity = V2.normalized(
      V2.sub( this.target.sprite.position, this.sprite.position )
    );

    this.velocity = V2.multiplyScalar(normalizedVelocity, this.speed * this.sprite.currentFrame);
  }

  goingForNexusScenario() {
    this.findOpponent();
    if (this.target) {
      this.state = EnemyState.FOLLOWING_PLAYER;
      return;
    }
  }

  step(dt: number): void {
    this.velocity.x = 0;
    this.velocity.y = 0;

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

    this.debugText.text = EnemyState[this.state];
  }
}

loadSpriteSheet(json, "/assets/json-spritesheets/slimes/", 0.15).then(an => {
  let enemy: Enemy = new Enemy(an, 50, 70);
  World.addEntity(enemy);
})
