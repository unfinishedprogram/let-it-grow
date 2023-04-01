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

  step(_dt: number): void {
    this.velocity = controller.directionVector;
    let selectedSprite: Sprite;
    if (this.velocity.y != 0) {
      selectedSprite = this.animationTable[Math.sign(this.velocity.y) < 0 ? 0 : 3];
    } else if (this.velocity.x != 0){
      selectedSprite = this.animationTable[Math.sign(this.velocity.x) < 0 ? 2 : 1];
    } else {
      selectedSprite = this.animationTable[3];
    }
    if (selectedSprite != this.sprite) {
      this.sprite.texture = selectedSprite.texture;
    }

  }
}

let player: Player = new Player(down);
World.addEntity(player);
