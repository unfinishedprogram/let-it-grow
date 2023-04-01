import { Sprite } from "pixi.js";
import { Collidable, PLAYER_MASK } from "./collidable";
import controller from "../controller";
import { Vec2 } from "../utils/vec2";
import World from "../world";

import { down, left, right, up } from "./player_anims";

class Player implements Collidable {
  id = "player";
  is_collidable: true = true;
  is_dynamic: true = true;
  velocity: Vec2 = {x: 0, y: 0};
  radius: number = 1;
  mass: number = 1;
  public collision_mask: number = PLAYER_MASK;

  private animationTable = [
    up,
    right,
    left,
    down
  ]

  onCollision(other: Collidable) {
  }


  constructor(public sprite: Sprite) { }

  step(dt: number): void {
    this.velocity = controller.directionVector;
    if (this.velocity.y != 0) {
      // this.sprite = this.animationTable[Math.sign(this.velocity.y) > 0 ? 0 : 3]
      const selectedSprite = this.animationTable[Math.sign(this.velocity.y) < 0 ? 0 : 3];
      if (selectedSprite != this.sprite) {
        this.sprite.texture = selectedSprite.texture;
      }
    }

  }
}

const anim = down;
let player: Player = new Player(anim);
World.addEntity(player);
// })
