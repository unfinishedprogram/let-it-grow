import { Sprite, Texture } from "pixi.js";
import { Entity } from "./entity/entity";
import controller from "./controller";
import day from "./day";

export default class Button implements Entity {
  is_fightable: boolean = false;
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  id: string = crypto.randomUUID();
  sprite: Sprite;
  buttonNumber: number | undefined;

  dayBase: Texture;
  dayPressed: Texture;

  nightBase: Texture;
  nightPressed: Texture;

  constructor(
    dayPressed: Texture,
    dayBase: Texture,
    nightPressed: Texture,
    nightBase: Texture,
    x: number,
    y: number,
    onPress: () => void,
    buttonNumber: number
  ) {
    this.dayPressed = dayPressed;
    this.dayBase = dayBase;
    this.nightPressed = nightPressed;
    this.nightBase = nightBase;
    if (day.stage == "night") {
      this.sprite = new Sprite(nightBase);
    } else {
      this.sprite = new Sprite(dayBase);
    }
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.buttonNumber = buttonNumber;
    window.addEventListener("keydown", () => {
      if (controller.numKeys[buttonNumber - 1].isPressed) {
        onPress();
      }
    });
  }

  step(dt: number): void {
    if (controller.selectedItem == this.buttonNumber) {
      if (day.stage == "night") {
        this.sprite.texture = this.nightPressed;
      } else {
        this.sprite.texture = this.dayPressed;
      }
    } else {
      if (day.stage == "night") {
        this.sprite.texture = this.nightBase;
      } else {
        this.sprite.texture = this.dayBase;
      }
    }
  }
}
