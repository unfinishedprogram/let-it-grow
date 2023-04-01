import { Container, Sprite, Texture, Text } from "pixi.js";
import { Entity } from "./entity/entity";
import day from "./day";
import World from "./world";

class Welcome implements Entity {
  is_dynamic?: boolean | undefined;
  is_collidable?: boolean | undefined;
  is_fightable = false;
  id = "welcome"
  container = new Container();

  private texture = Texture.from("assets/introPage.png");
  public sprite = Sprite.from(this.texture);

  constructor() {
    day.paused = true
    const text = new Text("PRESS ANYWHERE TO START", { fill: 'white', fontSize: '1rem', fontFamily: 'Pixelated' });
    text.scale.set(10);

    this.sprite.width = 1920 / 4.50;
    this.sprite.height = 1080 / 4.60;

    World.addUi(this)

    this.sprite.addChild(this.container);
    text.anchor.set(-0.15, -4.5);
    this.container.addChild(text);

    this.sprite.interactive = true;
    this.sprite.on('pointerdown', () => {
      day.paused = false
      World.removeEntity("welcome")
    });
  }

  step(_dt: number): void { }
}

export default Welcome
