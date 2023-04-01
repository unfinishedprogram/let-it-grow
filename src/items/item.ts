import { Sprite } from "pixi.js";

export interface Item {
  id: string,
  name: string,
  sprite: Sprite | null,
  cost: number,
  consumable: boolean,
  use(): void
}