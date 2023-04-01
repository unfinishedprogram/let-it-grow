import { Collidable } from "./collidable";

export type Combatible = {
  combatSystem: CombatSystem;
  onHit: (combatible: Combatible) => void;
} & Collidable ;

export type CombatSystem = {
  hp: number;
  maxHP: number;
  damage: number;
  radius: number;
  rechargeTime: number;
  isRecharging: boolean;
};
