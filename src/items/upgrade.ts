import { Sprite } from "pixi.js";
import { Item } from "./item";
import { allGuns } from "./all-items";
import fibonacci from "../utils/fibonacci";

class Upgrade implements Item {
  public id: string = "upgrade";
  public name: string;
  public number: number;
  public sprite: Sprite;
  public cost: number;
  consumable = false;
  
  constructor(sprite: Sprite, name: string, amount: number) { 
    this.name = name;
    this.number = amount;
    this.sprite = sprite;
    
    this.cost = 1;
  }

  getCost() {
    let total = 0;

    allGuns.forEach(gun => {
      total += gun.damageUpgrade
      total += gun.fireRateUpgrade
      total += gun.reloadUpgrade
    })

    return fibonacci(total)
  }

  use(): void {
    throw new Error("Method not implemented.");
  }
}

export default Upgrade;