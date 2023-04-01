import { Sprite, Texture, Text, Container } from "pixi.js";
import { Entity } from "../entity/entity";
import World from "../world";
import ShopSlot from "./shop-slot";
import { Item } from "../items/item";

class ShopItem implements Entity {
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  is_fightable = false;
  id = "tab";
  
  public sprite: Sprite;
  
  container = new Container();

  constructor(item: Item, x: number, y: number) {
    this.sprite = item.sprite;
    this.id = "shop-item-"+x+"-"+y;
    const cost = new Text(item.cost+"G", { fill: 'white', fontSize: '1rem', fontFamily: 'Pixelated' });

    this.sprite.position.x = 95 + 48 * x;
    this.sprite.position.y = 70 + 69 * y;
    new ShopSlot(item, x, y);

    World.addUi(this)
    this.sprite.width = 16 * 1.5;
    this.sprite.height = 16 * 1.5;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    
    this.sprite.addChild(this.container);
    cost.anchor.set(0.5, -1);
    this.container.addChild(cost);
  }

  step(dt: number): void { }
}

export default ShopItem