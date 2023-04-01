import { Sprite } from "pixi.js";
import { Item } from "./item";

class Ammunition implements Item {
  public name: string;
  public cost: number;
  id = "ammunition";
  consumable = true;

  use(): void {
    throw new Error("Method not implemented.");
  }

  constructor(public sprite: Sprite, cost: number) {
    this.name = "ammo";
    this.cost = cost;
  }
}

export default Ammunition;