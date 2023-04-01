import Gun from "./gun";
import Seed from "./seed";

class Inventory {
  private static instance: Inventory;

  public guns: Array<Gun>;
  public seeds: Array<Seed>;
  public gold: number;

  public static getInstance(): Inventory {
    if (!Inventory.instance) {
      Inventory.instance = new Inventory();
    }

    return Inventory.instance;
  }

  constructor() {
    this.guns = [];
    this.seeds = [];
    this.gold = 0;
  }

  addGun(gun: Gun) {
    this.guns.push(gun)
  }

  addGold(add: number) {
    this.gold += add
  }

  removeGold(remove: number) {
    if (remove > this.gold) return false;
    else {
      this.gold -= remove
      return true
    }
  }
}

let inventory = Object.freeze(new Inventory());

export default inventory;
