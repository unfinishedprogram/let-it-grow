import { Sprite } from "pixi.js";
import { Item } from "./item";

class Gun implements Item {
  public name: string;
  private baseRange: number;
  private baseDPS: number;
  private baseAmmo: number;

  id = "ammunition";
  cost = 1;
  consumable = false;

  constructor(public sprite: Sprite | null, range: number, dps: number, ammo: number, name: string) {
    this.baseRange = range;
    this.baseDPS = dps;
    this.baseAmmo = ammo;
    this.name = name;
  }

  use(): void {
    throw new Error("Method not implemented.");
  }
}

export default Gun;