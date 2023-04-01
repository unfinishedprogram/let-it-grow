import { Container, DisplayObject, Sprite, Text, Texture } from "pixi.js";
import { Entity } from "./entity/entity";

export class Nexus implements Entity {
  is_dynamic?: boolean | undefined = false;
  is_collidable?: boolean | undefined = true;
  is_fightable: boolean = true;
  id: string = "Nexus";
  sprite: Container<DisplayObject> = new Container().addChild(
    new Sprite(Texture.from("/assets/lifeTree.png"))
  );
  max_health: number = 100;
  health: number = this.max_health;
  radius = 25;
  text = new Text("PRESS ANYWHERE TO START", { fill: 'white', fontSize: '1rem', fontFamily: 'Pixelated' });
  constructor() {
    this.sprite.position.x = 275;
    this.sprite.position.y = 225;
    this.text.anchor.set(0, 0.8);
    // this.this.text
    this.sprite.addChild(this.text);
  }

  step(_dt: number): void {
    this.text.text = `${this.health} / ${this.max_health}`;
  }
}
