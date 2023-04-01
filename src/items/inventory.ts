import { allGuns } from "./all-items";
import Gun from "./gun";
import seeds from "./seed";
import Seed, { SeedName } from "./seed";


class Inventory {
  private static instance: Inventory;

  public guns: Array<Gun>;
  public seeds: Record<SeedName, number>;
  public ammo: number;
  public gold: number;

  public static getInstance(): Inventory {
    if (!Inventory.instance) {
      Inventory.instance = new Inventory();
    }

    return Inventory.instance;
  }

  constructor() {
    this.guns = allGuns;
    this.seeds = {} as any;
    for (let name in seeds) {
      this.seeds[name as SeedName] = 0;
    }
    this.gold = 50;
    this.ammo = 0;
  }

  addSeeds(seed: SeedName, quantity: number) {
    this.seeds[seed] += quantity;
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

  useAmmo() {
    if (this.ammo <= 0) {
      return false
    } else {
      this.ammo--
      return true
    }
  }
}



let inventory = new Inventory();

export default inventory;
