import { Sprite, Texture, Text, Container } from "pixi.js";
import { Entity } from "../entity/entity";
import World from "../world";
import Merchant from "../entity/merchant";
import ShopItem from "./shop-item";
import { ammo, gunUpgrades } from "../items/all-items";
import ShopUpgrade from "./shop-upgrades";
import inventory from "../items/inventory";

class Shop implements Entity {
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  is_fightable = false;

  id = "shop";
  
  private texture = Texture.from("assets/shop-base.png");
  public sprite = Sprite.from(this.texture);
  
  container = new Container();
  titleText = new Text('Merchant', { fill: 'white', fontSize: '1rem', fontFamily: 'Pixelated' });
  ammoText = new Text('20 Bullets: ', { fill: 'white', fontSize: '1rem', fontFamily: 'Pixelated' });

  constructor(merchant: Merchant) {
    World.addUi(this)

    this.sprite.position.x = 145;
    this.sprite.position.y = 100;
    
    this.sprite.width = 128 * 1.5;
    this.sprite.height = 144 * 1.5;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    
    merchant.seeds.forEach((seed, i) => {
      new ShopItem(seed, i, 0)
    })

    new ShopItem(ammo, 2, 1)

    gunUpgrades.forEach((upgrade, i) => {
      new ShopUpgrade(upgrade, 4, i)
    })
    
    this.sprite.addChild(this.container);
    this.titleText.anchor.set(0.5, 4.5);
    this.ammoText.anchor.set(0.69, -1.5);
    this.container.addChild(this.titleText);
    this.container.addChild(this.ammoText);
  }

  step(dt: number): void { }
}

export default Shop