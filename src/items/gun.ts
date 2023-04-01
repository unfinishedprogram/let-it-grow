import { CombatSystem } from "../entity/combatable";
import { instantiateProjectile } from "../entity/projectile";
import { V2, Vec2 } from "../utils/vec2";
import inventory from "./inventory";

class Gun {

  private baseDamage: number;
  private baseFireRate: number;

  public damage: () => number;
  public fireRate: () => number;
  public projectiles: number;
  public range: number;

  canFire: boolean = true;
  consumable = false;

  constructor(
    damage: number, 
    fireRate: number, 
    public numberOfProjectiles: number,
    range: number,
    public life: number,
    public speed: number,
    public spread: number,
    public reloadTime: number,
  ) {

    this.baseDamage = damage;
    this.baseFireRate = fireRate;
    this.projectiles = numberOfProjectiles;
    this.range = range;

    this.damage = () => inventory.damageUpgrade? this.baseDamage + 5: this.baseDamage;
    this.fireRate = () => inventory.fireRateUpgrade?  this.baseFireRate + 0.2: this.baseFireRate;
  }

  fire(direction: Vec2, position: Vec2) {
    if (!this.canFire) return;
    const combatSystem: CombatSystem = {
      damage: this.damage(),
      hp: this.life,
      maxHP: this.life,
      radius: 16,
      isRecharging: this.canFire,
      rechargeTime: this.fireRate()
    }


    for (let i = 0; i < this.numberOfProjectiles; i++) {
      setTimeout(() => instantiateProjectile(direction, position, combatSystem, this.speed, this.range), this.fireRate() * i);
    }

    this.canFire = false;
    setTimeout(() => this.canFire = true, this.reloadTime);

  }
}

export default Gun;
