import { Sprite } from "pixi.js";
import { Entity } from "./entity";
import { Position } from "./types";

class Player implements Entity {
    id = "player";

    get position(): Position {
        throw new Error("Method not implemented.");
    }

    step(dt: number): void {
        throw new Error("Method not implemented.");
    }

    constructor(public size: number, public sprite: Sprite) {

    }
}

export default Player;