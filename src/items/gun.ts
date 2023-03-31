import { Sprite } from "pixi.js";
import { Item } from "./item";

class Gun implements Item {
  id = "ammunition";
  cost = 1;
  consumable = false;

  use(): void {
    throw new Error("Method not implemented.");
  }

  constructor(public sprite: Sprite) {

  }
}