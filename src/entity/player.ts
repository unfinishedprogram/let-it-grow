import { AnimatedSprite, BaseTexture, Sprite, Spritesheet } from "pixi.js";
import json from "../../public/assets/json-spritesheets/walking_down.json";
import { Collidable, PLAYER_MASK } from "./collidable";
import controller from "../controller";
import { Vec2 } from "../utils/vec2";
import World from "../world";
// import controller from "./controller";


class Player implements Collidable {
  id = "player";
  is_collidable: true = true;
  is_dynamic: true = true;
  velocity: Vec2 = {x: 0, y: 0};
  radius: number = 1;
  mass: number = 1;
  public collision_mask: number = PLAYER_MASK;

  onCollision(other: Collidable) {
  }


  constructor(public sprite: Sprite) { }

  step(dt: number): void {
    this.velocity = controller.directionVector;
  }
}


const spritesheet = new Spritesheet(BaseTexture.from(json.meta.image), json);
spritesheet.parse().then(() => {
  spritesheet.baseTexture.resolution
  const anim = new AnimatedSprite(spritesheet.animations["Premium Charakter Spritesheet"]);
  anim.play();
  let player: Player = new Player(anim);
  World.addEntity(player);
})
