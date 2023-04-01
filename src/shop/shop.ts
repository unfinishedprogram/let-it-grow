import { Sprite, Texture } from "pixi.js";
import { Entity } from "../entity/entity";
import World from "../world";
import Merchant from "../entity/merchant";
import ShopSlot from "./shop-slot";
import ShopItem from "./shop-item";

class Shop implements Entity {
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  is_fightable = false;

  id = "shop";
  
  private texture = Texture.from("assets/shop-base.png");
  public sprite = Sprite.from(this.texture);

  constructor(merchant: Merchant) {
    World.addEntity(this)

    this.sprite.position.x = 320;
    this.sprite.position.y = 230;
    
    this.sprite.width = 128 * 3;
    this.sprite.height = 144 * 3;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    
    merchant.seeds.forEach((seed, i) => {
      new ShopItem(seed, i)
    })
  }

  step(dt: number): void { }
}

export default Shop