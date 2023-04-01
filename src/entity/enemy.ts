import { AnimatedSprite, BaseTexture, Sprite, Spritesheet } from "pixi.js";
import json from "../../public/assets/json-spritesheets/walking_down.json";
import { Collidable, ENEMY_MASK, PLAYER_MASK } from "./collidable";
import { V2, Vec2 } from "../utils/vec2";
import World from "../world";
// import controller from "./controller";


class Enemy implements Collidable {
  id = crypto.randomUUID();
  is_collidable: true = true;
  is_dynamic: true = true;
  velocity: Vec2 = {x: 0, y: 0};
  radius: number = 1;
  mass: number = 1;
  collision_mask: number = ENEMY_MASK;

  speed: number = 0.4;

  target: Collidable | null = null;

  onCollision(other: Collidable) {
    console.log(other);
  }

  constructor(public sprite: Sprite, public enemyDetectionRangeInner: number, public enemyDetectionRangeOutter: number) { }

  findCollidable(){ 
    for (let [_id, entity] of World.entities) {
      if (entity.is_collidable) {
        const cEntity = entity as Collidable;
        if (cEntity.collision_mask == PLAYER_MASK) {
          if (this.isInRange(cEntity, this.enemyDetectionRangeInner)) {
            this.target = cEntity;
          }
        }
      }

    }
  }

  isInRange(c: Collidable, range: number): boolean {
    return V2.distance(this.sprite.position, c.sprite.position) < range + c.radius;
  }

  step(dt: number): void {
    this.velocity.x = 0;
    this.velocity.y = 0;
    if (this.target) {
      const normalizedVelocity = V2.normalized(
        V2.sub( this.target.sprite.position, this.sprite.position )
      );

      this.velocity = V2.multiplyScalar(normalizedVelocity, this.speed);

      if (!this.isInRange(this.target, this.enemyDetectionRangeOutter)) this.target = null;

    } else {
      this.findCollidable();
    }
  }
}


const spritesheet = new Spritesheet(BaseTexture.from(json.meta.image), json);
spritesheet.parse().then(() => {
  spritesheet.baseTexture.resolution
  const anim = new AnimatedSprite(spritesheet.animations["Premium Charakter Spritesheet"]);
  anim.play();
  let enemy: Enemy = new Enemy(anim, 50, 70);
  World.addEntity(enemy);
})
