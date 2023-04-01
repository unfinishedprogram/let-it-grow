import Seed from "./seed";

class Inventory {
  private static instance: Inventory;
  public seeds: Array<Seed>;
  public ammo: number;
  public gold: number;

  public static getInstance(): Inventory {
    if (!Inventory.instance) {
      Inventory.instance = new Inventory();
    }

    return Inventory.instance;
  }

  constructor() {
    this.seeds = [];
    this.gold = 50;
    this.ammo = 0;
  }

  addSeed(seed: Seed) {
    this.seeds.push(seed)
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
      this.ammo --
      return true
    }
  }
}

let inventory = new Inventory();

export default inventory;
