import { Sprite } from "pixi.js";
import { Item } from "./item";

class Seed implements Item {
  public name: string;
  public cost: number;
  id = "seed";
  consumable = true;

  use(): void {
    throw new Error("Method not implemented.");
  }

  constructor(public sprite: Sprite | null, name: string, cost: number) {
    this.name = name;
    this.cost = cost;
  }
}

export default Seed;