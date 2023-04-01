import { Sprite, Texture } from "pixi.js";
import { Entity } from "../entity/entity";
import World from "../world";
import ShopSlot from "./shop-slot";
import { Item } from "../items/item";

class ShopItem implements Entity {
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  is_fightable = false;
  id = "tab";
  
  private texture: Texture;
  public sprite: Sprite;

  constructor(item: Item, x: number) {
    this.texture = Texture.from("assets/sproud-lands/Items/farm-items/seeds-"+item.name+".png");
    this.sprite = Sprite.from(this.texture);
    this.id = "shop-item-"+x;

    this.sprite.position.x = 224 + 96 * x;
    this.sprite.position.y = 66 + 96;
    new ShopSlot(item, x, 0);

    World.addEntity(this)
    this.sprite.width = 16 * 3;
    this.sprite.height = 16 * 3;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
  }

  step(dt: number): void { }
}

export default ShopItem