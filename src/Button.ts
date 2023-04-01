import { Sprite, Texture } from "pixi.js";
import { Entity } from "./entity/entity";
import controller from "./controller";
import { inBounds } from "./utils/bbox";

let isNight = true;
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
    if (isNight) {
      this.sprite = new Sprite(nightBase);
    } else {
      this.sprite = new Sprite(dayBase);
    }
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.scale.set(1.5);

    window.addEventListener("keydown", () => {
      if (controller.numKeys[buttonNumber - 1].isPressed) {
        onPress();
        this.buttonNumber = buttonNumber;
      }
    });
    window.addEventListener("click", () => {
      if (
        inBounds(
          { x: x + 2, y: y + 2 },
          { x: x + 30, y: y + 30 },
          controller.mousePosition
        )
      ) {
        onPress();
        this.buttonNumber = buttonNumber;
        controller.selectedItem = buttonNumber;
      }
    });

    setTimeout(() => (isNight = false), 10000);
  }

  step(dt: number): void {
    if (controller.selectedItem == this.buttonNumber) {
      if (isNight) {
        this.sprite.texture = this.nightPressed;
      } else {
        this.sprite.texture = this.dayPressed;
      }
    } else {
      if (isNight) {
        this.sprite.texture = this.nightBase;
      } else {
        this.sprite.texture = this.dayBase;
      }
    }
  }
}
