import { Sprite } from "pixi.js";
import { Item } from "./item";

class Ammunition implements Item {
  id = "ammunition";
  cost = 1;
  consumable = true;

  use(): void {
    throw new Error("Method not implemented.");
  }

  constructor(public sprite: Sprite) {

  }
}