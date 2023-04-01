import Dynamic from "./dynamic";
import { V2, Vec2 } from "../utils/vec2";

export const PLAYER_MASK = 1;
export const ENEMY_MASK = 2;

export type Collidable = {
    is_collidable: true,

    radius: number, // Probably in tiles?
    velocity: Vec2, // translation per DT
    mass: number, // Relative Value no units
    collision_mask: number,
    onCollision: (other: Collidable) => void
} & Dynamic;



export function checkCollision(a: Collidable, b: Collidable): boolean {
    // Check if they share a collision layer
    if ((a.collision_mask & b.collision_mask) !== 0) {
        // Sum of radius < distance
        return V2.distance(a.sprite.position, b.sprite.position) < a.radius + b.radius;
    }
    return false;
}
