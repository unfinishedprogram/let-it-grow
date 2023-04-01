import { Sprite, Texture, Text, Container } from "pixi.js";
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
  
  container = new Container();
  debugText = new Text('THIS IS SOME TETX', { fill: 'white', fontSize: '1rem' });

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

    
    this.debugText.anchor.set(0.5, 1);
    this.container.addChild(this.debugText);
  }

  step(dt: number): void { }
}

export default Shop