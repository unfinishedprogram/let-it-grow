// P0 - Upgrade Weapon , Buy crops, Buy ammo

import { Sprite } from "pixi.js";
import { Entity } from "./entity";
import { Position } from "./types";

/**
 * Needs:
 * -- SEPERATE TABS
 * - buy seeds --> seed class
 * - weapon upgrades
 * - buy ammo --> ammo class
 */

class Merchant implements Entity {
    id = "merchant";

    get position(): Position {
        throw new Error("Method not implemented.");
    }

    step(dt: number): void {
        throw new Error("Method not implemented.");
    }

    constructor(public size: number, public sprite: Sprite) {

    }
}

export default Merchant