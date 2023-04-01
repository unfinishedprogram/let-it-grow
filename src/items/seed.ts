import { Sprite } from "pixi.js";
import { Item } from "./item";

class Seed implements Item {
  public name: string;
  id = "ammunition";
  cost = 1;
  consumable = true;

  use(): void {
    throw new Error("Method not implemented.");
  }

  constructor(public sprite: Sprite, name: string) {
    this.name = name;
  }
}

export default Seed;