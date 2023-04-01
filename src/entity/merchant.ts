// P0 - Upgrade Weapon , Buy crops, Buy ammo

import { Sprite } from "pixi.js";
import { Entity } from "./entity";
import { Position } from "../types";
import Seed from "../items/seed";
import Gun from "../items/gun";
import { allSeeds } from "../items/all-items";

/**
 * Needs:
 * -- SEPERATE TABS
 * - buy seeds --> seed class
 * - buy weapon --> weapon class
 * - buy ammo --> ammo class
 * - weapon upgrades
 */

class Merchant implements Entity {
  public ammo: Array<number>;
  public seeds: Array<Seed>;
  public guns: Array<Gun>;
  private ammoStackAmount = 20;
  id = "merchant";

  get position(): Position {
    throw new Error("Method not implemented.");
  }

  step(dt: number): void {
    throw new Error("Method not implemented.");
  }

  constructor(public size: number, public sprite: Sprite) {
    this.ammo = this.getAmmo();
    this.seeds = this.getRandomSeeds();
    this.guns = [];
  }

  getRandomSeeds() {
    var arr = [];
    var seeds = [];
    while(arr.length < 3){
        var r = Math.floor(Math.random() * 11);
        if(arr.indexOf(r) === -1) {
          arr.push(r);
          seeds.push(allSeeds[r]);
        }
    }

    return seeds
  }

  getAmmo() {
    let ammo = []
    let r = Math.floor(Math.random() * 4) + 5;
    for(let i = 0; i < r; i++) ammo.push(this.ammoStackAmount);

    return ammo;
  }

  getGuns() {

  }
}

export default Merchant