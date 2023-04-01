import { Sprite, Texture } from "pixi.js";
import { Entity } from "../entity/entity";
import World from "../world";
import inventory from "../items/inventory";
import { Item } from "../items/item";

class ShopSlot implements Entity {
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  is_fightable = false;
  
  private texture = Texture.from("assets/buttonPressed.png");
  public sprite = Sprite.from(this.texture);
  public id: string;
  
  constructor(item: Item, x: number, y: number) {
    this.id = "shop-slot-"+x+"-"+y;
    World.addEntity(this)

    this.sprite.position.x = 224 + 96 * x;
    this.sprite.position.y = 160 + 96 * y;
    
    this.sprite.width = 32 * 3;
    this.sprite.height = 32 * 3;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.sprite.interactive = true;
    this.sprite.on('pointerdown', () => { 
      if(inventory.removeGold(item.cost)) {
        inventory.addSeed(item)
      }
      console.log(inventory)
    });
  }

  step(dt: number): void { }

}

export default ShopSlot