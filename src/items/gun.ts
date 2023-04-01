import { Sprite } from "pixi.js";
import { Item } from "./item";

class Gun implements Item {
  public name: string;
  public cost: number;

  public damage: number;
  private baseReload: number;
  private baseFireRate: number;
  private baseProjectiles: number;
  private maxAmmo: number;
  private baseRange: number;
  private baseDPS: number;

  id = "ammunition";
  consumable = false;

  constructor(public sprite: Sprite | null, 
      name: string, 
      cost: number, 
      damage: number, 
      reload: number, 
      fireRate: number, 
      projectiles: number, 
      ammo: number, 
      range: number, 
      dps: number) {
        
    this.name = name;
    this.cost = cost;

    this.damage = damage;
    this.baseReload = reload;
    this.baseFireRate = fireRate;
    this.baseProjectiles = projectiles;
    this.maxAmmo = ammo;
    this.baseRange = range;
    this.baseDPS = dps;
  }

  use(): void {
    throw new Error("Method not implemented.");
  }
}

export default Gun;