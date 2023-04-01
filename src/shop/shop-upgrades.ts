import { Container, DisplayObject, Sprite, Texture, Text } from "pixi.js";
import { Entity } from "../entity/entity";
import World from "../world";
import Upgrade from "../items/upgrade";
import { gunUpgrades } from "../items/all-items";

const BUTTON = Texture.from("assets/buttons/upgradeButton.png");
const PRESSED = Texture.from("assets/buttons/upgradePressed.png");

class ShopUpgrade implements Entity {
  is_dynamic?: undefined;
  is_collidable?: undefined;
  is_fightable = false;
  public id: string;
  public selected: boolean = false;

  container = new Container();
  public sprite = Sprite.from(BUTTON);

  constructor(upgrade: Upgrade, x: number, y: number) {
    this.id = "upgrade-"+upgrade.name
    console.log(this.id)
    const title = new Text(upgrade.name, { fill: 'white', fontSize: '1rem', fontFamily: 'Pixelated' });
    const bonus = new Text("bonus", { fill: 'white', fontSize: '1rem', fontFamily: 'Pixelated' });

    this.sprite.position.x = 95 + 52 *(x);
    this.sprite.position.y = 74 + 55 * (y - 0.5);

    this.sprite.width = 96 * 1.5;
    this.sprite.height = 32 * 1.5;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    
    World.addUi(this)
    
    this.sprite.addChild(this.container);
    title.anchor.set(0.5, 0.97);
    bonus.anchor.set(0.5, 0.27);
    this.container.addChild(title);
    this.container.addChild(bonus);
    
    this.sprite.interactive = true;
    this.sprite.on('pointerdown', () => {
      this.selected = !this.selected
      if(this.selected) this.sprite.texture = PRESSED
      else this.sprite.texture = BUTTON
    });
  }

  step(dt: number): void { }
}

export default ShopUpgrade