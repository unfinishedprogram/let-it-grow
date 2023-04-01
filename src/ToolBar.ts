import { Sprite, Texture } from "pixi.js";
import { Entity } from "./entity/entity";
import Button from "./Button";

export default class ToolBar implements Entity {
  public sprite: Sprite;
  is_fightable: boolean = false;

  id: string = crypto.randomUUID();

  buttons = [
    new Button(
      Texture.from("/assets/buttons/seedPressed.png"),
      Texture.from("/assets/buttons/seedButton.png"),
      Texture.from("/assets/buttons/riflePressed.png"),
      Texture.from("/assets/buttons/rifleButton.png"),
      0,
      0,
      () => console.log("clicked"),
      1
    ),
    new Button(
      Texture.from("/assets/buttons/hoePressed.png"),
      Texture.from("/assets/buttons/hoeButton.png"),
      Texture.from("/assets/buttons/revolverPressed.png"),
      Texture.from("/assets/buttons/revolverButton.png"),
      32,
      0,
      () => console.log("clicked"),
      2
    ),
    new Button(
      Texture.from("/assets/buttons/wateringCanPressed.png"),
      Texture.from("/assets/buttons/wateringCanButton.png"),
      Texture.from("/assets/buttons/shotgunPressed.png"),
      Texture.from("/assets/buttons/shotgunButton.png"),
      64,
      0,
      () => console.log("clicked"),
      3
    ),
  ];

  constructor(x: number, y: number) {
    // This is the size of the sprite make sure buttons are 2.25 apart from each other :)
    // length = 105;
    // width = 35;
    this.sprite = new Sprite(Texture.from("/assets/buttons/buttonBox.png"));
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.buttons.forEach((button) => this.sprite.addChild(button.sprite));
  }

  step(dt: number): void {
    this.buttons.forEach((button) => button.step(dt));
  }
}
