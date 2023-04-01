import { Sprite, Texture } from "pixi.js";
import { Entity } from "./entity/entity";

export default class ButtonBox implements Entity {
  sprite: Sprite;
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  id: string = crypto.randomUUID();

  constructor(x: number, y: number) {
    // This is the size of the sprite make sure buttons are 2.25 apart from each other :)
    // length = 105;
    // width = 35;
    this.sprite = new Sprite(Texture.from("/assets/buttons/buttonBox.png"));
    this.sprite.position.x = x;
    this.sprite.position.y = y;
  }

  step(dt: number): void {}
}
