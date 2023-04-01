import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { Collidable, PLANT_MASK } from "./entity/collidable";
import controller from "./controller";
import seeds, { SeedName } from "./items/seed";
import day from "./day";
import inventory from "./items/inventory";
import { Combatible, CombatSystem } from "./entity/combatable";



export enum TileState {
  None,
  Watered,
  Tilled,
  Planted,
}


export const TEX_TILLED = Texture.from("assets/tiled.png");
export const TEX_EMPTY = Texture.from("assets/empty.png");
export const TEX_WATERED = Texture.from("assets/watered.png");

export type Plant = {
  growthStage: number,
  seed: SeedName,
  sprite: AnimatedSprite,
  startTime: number,
  startDay: number
}

export class Tile implements Combatible {
  is_collidable: true = true;
  is_dynamic: true = true;
  is_fightable = false;
  id = crypto.randomUUID();
  radius = 8;
  velocity = { x: 0, y: 0 };
  mass = 1;
  collision_mask = 0;
  drag = 1;
  bgSprite: Sprite = new Sprite();
  lastTime: number = day.time;
  inDom: boolean = false;

  onCollision(_other: Collidable) { }

  plant: Plant | undefined;
  state: TileState = TileState.None;
  sprite = new Container();

  constructor(x: number, y: number) {
    this.bgSprite.anchor.set(0.5, 0.5);
    this.sprite.addChild(this.bgSprite);
    this.sprite.position.x = x;
    this.sprite.position.y = y;
  }
  combatSystem: CombatSystem = {
    hp: 5,
    maxHP: 5,
    damage: 0,
    radius: 1,
    isRecharging: false,
    rechargeTime: 0,
  };

  onHit(combatible: Combatible) {
    this.combatSystem.hp -= combatible.combatSystem.damage;
  }

  mabyeAdd() {
    if (!this.inDom) {
      this.inDom = true;
    }
  }

  doTill(): void {
    this.mabyeAdd();
    if (this.state == TileState.None) {
      this.state = TileState.Tilled;
      this.bgSprite.texture = TEX_TILLED;
    }
  }

  doWater(): void {
    this.mabyeAdd();
    if (this.state == TileState.Tilled) {
      this.state = TileState.Watered;
      this.bgSprite.texture = TEX_WATERED;
    }
  }

  doPick(): void {
    if (this.plant?.growthStage ? this.plant?.growthStage : 0 > 3) {
      inventory.addGold(seeds[this.plant!.seed].price);
      this.state = TileState.None;
      this.bgSprite.texture = TEX_EMPTY;
      if (this.plant) {
        this.sprite.removeChild(this.plant.sprite);
      }
      this.plant = undefined;
      this.collision_mask = 0;
    }
  }


  doPlant(seed: SeedName) {
    this.mabyeAdd();

    if (!this.plant && this.state == TileState.Watered) {
      const plant: Plant = {
        seed,
        growthStage: 0,
        sprite: seeds[seed].plantTexture(),
        startTime: day.time,
        startDay: day.inGameDays,
      }

      this.plant = plant;
      this.collision_mask = PLANT_MASK;
      this.sprite.addChild(plant.sprite);
    }
    console.log(this.plant);
  }



  step(_dt: number): void {
    if (this.plant) {
      const elapsed = day.inGameDays - this.plant.startDay;
      let growth = (elapsed / seeds[this.plant.seed].growTime) * this.plant.sprite.totalFrames;
      let frame = Math.min(growth | 0, 3);
      this.plant.sprite.currentFrame = frame;
      this.plant.growthStage = growth;
    }
  }
}

export default class Garden {
  readonly x: number = 11;
  readonly y: number = 14;
  readonly width: number = 16;
  readonly height: number = 5;

  tiles: Tile[] = [];
  sprite: Container;

  constructor() {
    this.sprite = new Container();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const worldX = (x + this.x) * 16;
        const worldY = (y + this.y) * 16;
        const tile = new Tile(worldX, worldY);
        this.tiles.push(tile);
        this.sprite.addChild(tile.sprite);
      }
    }

    document.addEventListener("click", () => {
      if (day.stage != "day") return;

      let { x, y } = controller.mousePosition;
      const tile = this.getTile(x + 8, y + 8);
      if (!tile) return;

      if (controller.selectedItem == 1) {
        tile.doPlant("carrot");
      } else if (controller.selectedItem == 2) {
        tile.doTill();
      } else if (controller.selectedItem == 3) {
        tile.doWater();
      }

      if (tile.plant) {
        if (tile.plant.growthStage > 3) {
          tile.doPick()
        }
      }
    })
  }

  // Get tile at world position
  getTile(px: number, py: number): Tile | undefined {
    const x = ((px / 16) | 0) - this.x;
    const y = ((py / 16) | 0) - this.y;

    if (x < 0 || y < 0 || x > this.width || y > this.height) return undefined

    const index = x + this.width * y;
    return this.tiles[index];
  }

  step(dt: number) {
    this.tiles.forEach(tile => tile.step(dt));
  }
}
