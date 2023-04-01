import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Entity } from "./entity/entity";

export class Nexus implements Entity {
  is_dynamic?: boolean | undefined = false;
  is_collidable?: boolean | undefined = true;
  is_fightable: boolean = true;
  id: string = crypto.randomUUID();
  sprite: Container<DisplayObject> = new Container().addChild(
    new Sprite(Texture.from("/assets/lifeTree.png"))
  );
  health: number = 100;
  constructor() {
    this.sprite.position.x = 275;
    this.sprite.position.y = 225;
  }

  step(dt: number): void {}
}
