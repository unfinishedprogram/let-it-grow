import { Container, Text, TextStyle } from "pixi.js";
import Dynamic from "./entity/dynamic";
import { Vec2 } from "./utils/vec2";
import World from "./world";

export class HitNumber implements Dynamic {
  id: string = crypto.randomUUID();
  text: Text;
  is_fightable: boolean = false;
  displayTime: number = 500;
  sprite: Container = new Container();
  is_dynamic: true = true;
  velocity: Vec2 = {x: 0.05, y: -0.5};
  is_collidable?: boolean | undefined;


  step(_dt: number): void {
  }

  constructor(damage: string, position: Vec2) {
    this.sprite.position.set(position.x, position.y);
    this.text = new Text(damage, new TextStyle({ fontFamily: 'Pixelated', fontSize: 16, fill: 'red', fontWeight: '100', stroke: 'white' }));
    this.text.scale.set(1.6, 1.6);
    this.text.anchor.set(0.5, 1);
    this.sprite.addChild(this.text);
    setTimeout(() => World.removeEntity(this.id), this.displayTime);
  }

}
