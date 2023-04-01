import { Vec2 } from "../utils/vec2";
import { Entity } from "./entity";

export default interface Dynamic extends Entity {
    is_dynamic: true,

    velocity: Vec2,
}

export function stepDynamic(dt: number, entity: Dynamic) {
    entity.sprite.position.x += entity.velocity.x * dt;
    entity.sprite.position.y += entity.velocity.y * dt;
}
