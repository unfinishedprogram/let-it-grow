import World from "../world";
import Gun from "./gun";
import seeds from "./seed";
import { SeedName } from "./seed";


class Inventory {
  private static instance: Inventory;

  public seeds: Record<SeedName, number>;
  public ammo: number;
  public gold: number;
  public damageUpgrade = false;
  public fireRateUpgrade = false;

  public static getInstance(): Inventory {
    if (!Inventory.instance) {
      Inventory.instance = new Inventory();
    }

    return Inventory.instance;
  }

  constructor() {
    this.seeds = {} as any;
    for (let name in this.seeds) {
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
    World.goldIndicator.text = "GOLD: "+this.gold
  }

  removeGold(remove: number) {
    if (remove > this.gold) return false;
    else {
      this.gold -= remove
      World.goldIndicator.text = "GOLD: "+this.gold
      return true
    }
  }

  addAmmo(add: number) {
    this.ammo += add
    World.ammoIndicator.text = "AMMO: "+this.gold
  }

  useAmmo() {
    if (this.ammo <= 0) {
      return false
    } else {
      this.ammo --
      World.ammoIndicator.text = "AMMO: "+this.gold
      return true
    }
  }
}

let inventory = new Inventory();

export default inventory;
