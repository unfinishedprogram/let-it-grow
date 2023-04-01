import { Sprite, Texture } from "pixi.js";
import { Entity } from "./entity/entity";
import controller from "./controller";
import { inBounds } from "./utils/bbox";

// let currentlySelected = 0;

export default class Button implements Entity {
  is_fightable: boolean = false;
  pressed: Texture;
  base: Texture;
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  id: string = crypto.randomUUID();
  sprite: Sprite;
  buttonNumber: number | undefined;

  constructor(
    pressed: Texture,
    base: Texture,
    x: number,
    y: number,
    onPress: () => void,
    buttonNumber: number
  ) {
    this.pressed = pressed;
    this.base = base;
    this.sprite = new Sprite(base);
    this.sprite.position.x = x;
    this.sprite.position.y = y;

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
  }

  step(dt: number): void {
    if (controller.selectedItem == this.buttonNumber) {
      this.sprite.texture = this.pressed;
    } else {
      this.sprite.texture = this.base;
    }
  }
}
