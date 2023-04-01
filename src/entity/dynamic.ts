import { Vec2 } from "../utils/vec2";
import { Entity } from "./entity";

export default interface Dynamic extends Entity {
    is_dynamic: true,
    // 1 is no drag, > 1 speeds up over time < 1 slows down over time
    drag: number,
    velocity: Vec2,
}

export function stepDynamic(dt: number, entity: Dynamic) {
    entity.sprite.position.x += entity.velocity.x * dt;
    entity.sprite.position.y += entity.velocity.y * dt;
    entity.velocity.x *= entity.drag;
    entity.velocity.y *= entity.drag;
}
