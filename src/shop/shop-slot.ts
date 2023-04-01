import { Sprite, Texture } from "pixi.js";
import { Entity } from "../entity/entity";
import World from "../world";
import inventory from "../items/inventory";
import { Item } from "../items/item";

const BUTTON = Texture.from("assets/button.png");
const PRESSED = Texture.from("assets/buttonPressed.png");

class ShopSlot implements Entity {
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  is_fightable = false;
  public selected: boolean = false;
  
  private texture = BUTTON
  public sprite = Sprite.from(this.texture);
  public id: string;
  
  constructor(item: Item, x: number, y: number) {
    this.id = "shop-slot-"+x+"-"+y;
    World.addUi(this)

    this.sprite.position.x = 95 + 48 * x;
    this.sprite.position.y = 69 + 69 * y;
    
    this.sprite.width = 32 * 1.5;
    this.sprite.height = 32 * 1.5;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.sprite.interactive = true;
    this.sprite.on('pointerdown', () => {
      this.selected = !this.selected
      this.sprite.texture = PRESSED

      if(inventory.removeGold(item.cost)) {
        if (item.id === "seed") {
          inventory.addSeed(item)
        }
        else if (item.id === "ammunition") {
          inventory.ammo += 5;
        }
      }
    });

    this.sprite.on('pointerup', () => {
      this.sprite.texture = BUTTON
    })
  }

  step(dt: number): void { }

}

export default ShopSlot
