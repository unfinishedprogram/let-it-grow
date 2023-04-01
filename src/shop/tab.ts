import { Sprite, Texture } from "pixi.js";
import { Entity } from "../entity/entity";

class ShopItem implements Entity {
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  is_fightable = false;
  id = "tab";
  
  private texture = Texture.from("assets/sproud-lands/shop-base.png");
  public sprite = Sprite.from(this.texture);

  step(dt: number): void {
    throw new Error("Method not implemented.");
  }
}