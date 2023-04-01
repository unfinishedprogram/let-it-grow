// P0 - Upgrade Weapon , Buy crops, Buy ammo
import { Entity } from "./entity";
import { Position } from "../types";
import Seed from "../items/seed";
import Gun from "../items/gun";
import { allSeeds, gunUpgrades } from "../items/all-items";
import { RenderTexture, Sprite, Texture, autoDetectRenderer } from "pixi.js";
import Upgrade from "../items/upgrade";
import inventory from "../items/inventory";
import World from "../world";

/**
 * Needs:
 * -- SEPERATE TABS
 * - buy seeds --> seed class
 * - buy weapon --> weapon class
 * - buy ammo --> ammo class
 * - weapon upgrades
 */

class Merchant implements Entity {
  is_dynamic? = false;
  is_collidable? = true;

  public ammo: Array<number>;
  public seeds: Array<Seed>;
  public guns: Array<Gun>;
  public upgrades: Array<Upgrade>;
  private ammoStackAmount = 20;
  private shopOpen = false;
  id = "merchant";

  get position(): Position {
    throw new Error("Method not implemented.");
  }

  step(dt: number): void { }

  constructor(public sprite: Sprite) {
    this.ammo = this.getAmmo();
    this.seeds = this.getRandomSeeds();
    this.guns = [];
    this.upgrades = gunUpgrades;
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
    inventory
  }
}

const text = Texture.from("assets/sproud-lands/characters/merchant.png");
const sprite = Sprite.from(text);

const merchant = new Merchant(sprite)
World.addEntity(merchant)