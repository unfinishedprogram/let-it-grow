import { Sprite } from 'pixi.js';
import { Item } from "./item";

class Gun implements Item {
  public name: string;
  public cost: number;

  private baseDamage: number;
  private baseReload: number;
  private baseFireRate: number;
  private damageUpgrade = 0;
  private reloadUpgrade = 0;
  private fireRateUpgrade = 0;

  public damage: () => number;
  public reload: () => number;
  public fireRate: () => number;
  public projectiles: number;
  public maxAmmo: number;
  public range: number;
  public dps: number;

  id = "gun";
  consumable = false;

  constructor(public sprite: Sprite | null, name: string, 
      cost: number, damage: number, 
      reload: number, fireRate: number, 
      projectiles: number, ammo: number, 
      range: number, dps: number) {
        
    this.name = name;
    this.cost = cost;

    this.baseDamage = damage;
    this.baseReload = reload;
    this.baseFireRate = fireRate;
    this.projectiles = projectiles;
    this.maxAmmo = ammo;
    this.range = range;
    this.dps = dps;

    this.damage = () => {
      return this.baseDamage + (this.damageUpgrade * 5)
    }
    
    this.reload = () => {
      return this.baseReload + (this.reloadUpgrade)
    }

    this.fireRate = () => {
      return this.baseFireRate + (this.fireRateUpgrade * 0.2)
    }
  }

  use(): void {
    throw new Error("Method not implemented.");
  }
}

export default Gun;