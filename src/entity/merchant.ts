// P0 - Upgrade Weapon , Buy crops, Buy ammo
import { Entity } from "./entity";
import Seed from "../items/seed";
import Gun from "../items/gun";
import { allGuns, allSeeds, gunUpgrades } from "../items/all-items";
import { Container, RenderTexture, Sprite, Texture, autoDetectRenderer } from "pixi.js";
import Upgrade from "../items/upgrade";
import World from "../world";
import controller from "../controller";
import { inBounds } from "../utils/bbox";
import Shop from "../shop/shop";
import { Vec2 } from "../utils/vec2";
import day from "../day";

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
  is_fightable = false;

  private texture = Texture.from("assets/sproud-lands/characters/merchant.png");
  public sprite = Sprite.from(this.texture);
  
  private popupText = Texture.from("assets/sproud-lands/objects/shopping.png");
  public popup = Sprite.from(this.popupText);

  public ammo: Array<number>;
  public seeds: Array<Seed>;
  public guns: Array<Gun>;
  public upgrades: Array<Upgrade>;
  private ammoStackAmount = 20;
  id = "merchant";

  get position(): Vec2 {
    throw new Error("Method not implemented.");
  }

  step(dt: number): void { }

  constructor() {
    this.ammo = this.getAmmo();
    this.seeds = this.getRandomSeeds();
    this.guns = this.getGuns();
    this.upgrades = gunUpgrades;
    
    this.sprite.position.x = 407;
    this.sprite.position.y = 398;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    let container = new Container();
    
    this.sprite.interactive = true;
    this.sprite.on('pointerdown', () => { 
      if (!World.entities.has("shop")) {
        new Shop(this) 
      }
    });

    window.addEventListener("click", () => {
      if (World.entities.has("shop") &&
        !inBounds(
          { x: 160, y: 50 },
          { x: 476, y: 415 },
          controller.mousePosition
        )) {
        World.removeEntity("shop")
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            try{ World.removeEntity("shop-slot-"+x+"-"+y) } catch {}
            try{ World.removeEntity("shop-item-"+x+"-"+y) } catch {}
          }
        }
      }
    })

    World.addEntity(this)
    this.sprite.addChild(container);
    this.popup.anchor.set(0.5, 0.15);
    container.addChild(this.popup);
  }

  getRandomSeeds() {
    var arr = [];
    var seeds = [];
    while (arr.length < 3) {
      var r = Math.floor(Math.random() * 11);
      if (arr.indexOf(r) === -1) {
        arr.push(r);
        seeds.push(allSeeds[r]);
      }
    }

    return seeds
  }

  getAmmo() {
    let ammo = []
    let r = Math.floor(Math.random() * 4) + 5;
    for (let i = 0; i < r; i++) ammo.push(this.ammoStackAmount);

    return ammo;
  }

  getGuns() {
    return allGuns
  }
}

const merchant = new Merchant()

export default Merchant