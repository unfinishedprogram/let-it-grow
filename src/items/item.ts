import { Sprite } from "pixi.js";

export interface Item {
  id: string,
  name: string,
  sprite: Sprite,
  cost: number,
  consumable: boolean,
  use(): void
}