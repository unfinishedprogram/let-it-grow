import { Sprite } from "pixi.js";
import World from "./world";
import { Collidable } from "./entity/collidable";
import { Plant, TileState, TEX_EMPTY, TEX_TILLED, TEX_WATERED } from "./garden";

export class Tile implements Collidable {
    is_collidable: true = true;
    is_dynamic: true = true;
    is_fightable = false;
    id = crypto.randomUUID();
    radius = 8;
    velocity = { x: 0, y: 0 };
    mass = 1;
    collision_mask = 0;
    drag: number = 0;

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

        World.app.stage.addChild(this.bgSprite, this.fgSprite);
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

    doPlant(_seed: any): void {
    }

    step(_dt: number): void {
    }
}
