import { Container } from "pixi.js"

export interface Entity {
  // Component flags
  is_dynamic?: boolean,
  is_collidable?: boolean,
  is_fightable: boolean,

  id: string, // UUID
  sprite: Container,
  step(dt: number): void // dt in ms
}

