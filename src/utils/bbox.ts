import { Collidable } from "../entity/collidable";
import Dynamic from "../entity/dynamic";
import { Vec2 } from "./vec2";

export function inBounds(min: Vec2, max: Vec2, point: Vec2): boolean {
    if (point.x < min.x) return false;
    if (point.y < min.y) return false;
    if (point.x > max.x) return false;
    if (point.y > max.y) return false;
    return true;
}

export function pushOut(entity: Dynamic, box: BoundBox) {
    const bMax = box.max;
    const bMin = box.min;
    const epos = entity.sprite.position;
    const r = (entity as Collidable).radius || 0;

    const midW = Math.abs(bMin.x - bMax.x) / 2;
    const midH = Math.abs(bMin.y - bMax.y) / 2;

    const mid = {
        x: (box.min.x + box.max.x) / 2,
        y: (box.min.y + box.max.y) / 2,
    }

    if (
        epos.x > bMin.x - r && epos.x < bMax.x + r &&
        epos.y > bMin.y - r && epos.y < bMax.y + r
    ) {
        for (let i = 0; i < 6; i++) {
            const signX = Math.sign(mid.x - epos.x);
            const signY = Math.sign(mid.y - epos.y);
            let pushX = (mid.x - epos.x - (signX * midW));
            let pushY = (mid.y - epos.y - (signY * midH));

            if (Math.abs(pushX) < Math.abs(pushY)) {
                epos.x += pushX;
            } else {
                epos.y += pushY;
            }
        }
    }
}
export function keepIn(entity: Dynamic, box: BoundBox) {
    const bMax = box.max;
    const bMin = box.min;
    const epos = entity.sprite.position;
    const r = (entity as Collidable).radius || 0;

    if (epos.x < bMin.x + r) epos.x += bMin.x + r - epos.x;
    if (epos.x > bMax.x - r) epos.x += bMax.x - r - epos.x;
    if (epos.y < bMin.y + r) epos.y += bMin.y + r - epos.y;
    if (epos.y > bMax.y - r) epos.y += bMax.y - r - epos.y;
}


export type BoundBox = {
    min: Vec2
    max: Vec2
}
