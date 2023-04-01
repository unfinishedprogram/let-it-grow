import { Entity } from "./entity";
import { Vec2 } from "./vec2";

export default interface Dynamic extends Entity {
    is_dynamic: true,

    velocity: Vec2,
}

export function stepDynamic(dt: number, entity: Dynamic) {
    entity.sprite.position.x += entity.velocity.x * dt;
    entity.sprite.position.y += entity.velocity.y * dt;
}