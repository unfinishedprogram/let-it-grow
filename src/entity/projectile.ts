import { AnimatedSprite, Sprite } from "pixi.js";
import { loadSpriteSheet } from "../utils/util";
import { V2, Vec2 } from "../utils/vec2";
import World from "../world";
import { BULLET_MASK, Collidable } from "./collidable";
import { Combatible, CombatSystem } from "./combatable";
import json from "../../public/assets/bullets/bullet.json";

class Projectile implements Combatible  {
  id: string = crypto.randomUUID();
  is_dynamic: true = true;
  is_collidable: true = true;
  is_fightable: boolean = true;

  radius: number = 2;
  mass: number = 1;
  collision_mask: number = BULLET_MASK;

  travelledRange: number = 0;

  onHit(combatible: Combatible) {
    this.combatSystem.hp -= 1;
    if (this.combatSystem.hp < 0) {
      // World.removeEntity(this.id);
    }

    combatible.onHit(this);
  };

  onCollision(_other: Collidable) {
  }

  step(_dt: number): void {
    this.travelledRange += (Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2)) ** 0.5;
    if (this.travelledRange > this.maxRange) {
      World.removeEntity(this.id);
    }
  }

  constructor(public sprite: Sprite, public combatSystem: CombatSystem, public velocity: Vec2, public maxRange: number) { }
}


const jsonC = JSON.parse(JSON.stringify(json));
const bulletSpriteSheet = await loadSpriteSheet(jsonC, "/assets/bullets/", 0.8);
export async function instantiateWeakProjectile(velocity: Vec2, startingPosition: Vec2) {
  const animatedSprite = new AnimatedSprite(bulletSpriteSheet.textures);

  animatedSprite.play();
  animatedSprite.animationSpeed = 0.2;
  animatedSprite.scale.set(2, 2);
  animatedSprite.position.set(startingPosition.x, startingPosition.y);
  animatedSprite.anchor.set(0.5, 0.5);

  const changedVelocity = V2.multiplyScalar(velocity, 4);

  const proj = new Projectile(animatedSprite, {
    hp: 1,
    damage: 5,
    rechargeTime: 0,
    maxHP: 1,
    radius: 2,
    isRecharging: false,
  }, changedVelocity, 150);

  World.addEntity(proj);
}
