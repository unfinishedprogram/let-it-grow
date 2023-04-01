import { Sprite, Texture } from "pixi.js";
import World from "./world";
import { Collidable } from "./entity/collidable";
import controller from "./controller";


type Plant = "placeholder"

enum TileState {
  None,
  Watered,
  Tilled,
  Planted,
}


const TEX_TILLED = Texture.from("assets/tiled.png");
const TEX_EMPTY = Texture.from("assets/empty.png");
const TEX_WATERED = Texture.from("assets/watered.png");

class Tile implements Collidable {
  is_collidable: true = true;
  is_dynamic: true = true;
  is_fightable = false;
  id = crypto.randomUUID();
  radius = 8;
  velocity = { x: 0, y: 0 };
  mass = 1;
  collision_mask = 0;
  drag = 1;

  onCollision(_other: Collidable) { }

  plant: Plant | undefined;
  bgSprite: Sprite;
  fgSprite: Sprite;
  state: TileState = TileState.None;
  sprite = new Sprite();

  constructor(x: number, y: number) {
    this.bgSprite = new Sprite(TEX_EMPTY);
    this.fgSprite = new Sprite(TEX_EMPTY);

    this.sprite.position.x = x;
    this.sprite.position.y = y;

    this.bgSprite.position.x = x;
    this.bgSprite.position.y = y;

    this.fgSprite.position.x = x;
    this.fgSprite.position.y = y;

    World.container.addChild(this.bgSprite, this.fgSprite);
  }


  doTill(): void {
    if (this.state == TileState.None) {
      this.state = TileState.Tilled;
      this.bgSprite.texture = TEX_TILLED;
    }
  }

  doWater(): void {
    if (this.state == TileState.Tilled) {
      this.state = TileState.Watered;
      this.bgSprite.texture = TEX_WATERED;
    }
  }

  doPlant(seed: any): void {

  }

  step(_dt: number): void {

  }
}

class _Garden {
  readonly x: number = 11;
  readonly y: number = 14;
  readonly width: number = 16;
  readonly height: number = 5;

  tiles: Tile[] = [];

  constructor() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const worldX = (x + this.x) * 16;
        const worldY = (y + this.y) * 16;
        const tile = new Tile(worldX, worldY);

        this.tiles.push(tile);
        World.addEntity(tile);
      }
    }
  }

  // Get tile at world position
  getTile(px: number, py: number): Tile | undefined {
    const x = ((px / 16) | 0) - this.x;
    const y = ((py / 16) | 0) - this.y;

    if (x < 0 || y < 0 || x > this.width || y > this.height) return undefined

    const index = x + this.width * y;
    return this.tiles[index];
  }
}

document.addEventListener("click", () => {
  let { x, y } = controller.mousePosition;
  Garden.getTile(x, y)?.doWater();
  Garden.getTile(x, y)?.doTill();
})

const Garden = new _Garden();
export default Garden; 