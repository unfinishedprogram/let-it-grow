import { Sprite } from "pixi.js"
import { Position } from "./types"

export interface Entity {
    id: string, // UUID
    position: Position; // Center
    size: number, // Radius
    sprite: Sprite,
    step(dt: number): void // dt in ms
}

