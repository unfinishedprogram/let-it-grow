import { AnimatedSprite, BaseTexture, Sprite, Spritesheet } from "pixi.js";
import json from "../public/assets/json-spritesheets/walking_down.json";
import { Entity } from "./entity";
import { Position } from "./types";
import World from "./world";

class Player implements Entity {
  id = "player";


  get position(): Position {
    throw new Error("Method not implemented.");
  }

  step(dt: number): void {
    this.sprite.position.x += 1 * dt;
    // throw new Error("Method not implemented.");
  }

  constructor(public sprite: Sprite) { }
}


const spritesheet = new Spritesheet(BaseTexture.from(json.meta.image), json);
spritesheet.parse().then(() => {
  spritesheet.baseTexture.resolution
  const anim = new AnimatedSprite(spritesheet.animations["Premium Charakter Spritesheet"]);
  anim.play();
  let player: Player = new Player(anim);
  World.addEntity(player);
  console.log(player);
})
