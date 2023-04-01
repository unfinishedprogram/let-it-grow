import { Sprite } from "pixi.js"

export interface Entity {
  // Component flags
  is_dynamic?: boolean,
  is_collidable?: boolean,
  is_fightable: boolean,

  id: string, // UUID
  sprite: Sprite,
  step(dt: number): void // dt in ms
}

