// P0 - Upgrade Weapon , Buy crops, Buy ammo

import { Sprite } from "pixi.js";
import { Entity } from "./entity";
import { Position } from "./types";
import Ammunition from "./items/ammo";
import Seed from "./items/seed";
import Gun from "./items/gun";

/**
 * Needs:
 * -- SEPERATE TABS
 * - buy seeds --> seed class
 * - buy weapon --> weapon class
 * - buy ammo --> ammo class
 * - weapon upgrades
 */

class Merchant implements Entity {
  id = "merchant";

  get position(): Position {
    throw new Error("Method not implemented.");
  }

  step(dt: number): void {
    throw new Error("Method not implemented.");
  }

  constructor(public size: number, public sprite: Sprite) {
    let ammo: Array<Ammunition> = []
    let seeds: Array<Seed> = []
    let guns: Array<Gun> = []
  }
}

export default Merchant