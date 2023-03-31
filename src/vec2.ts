export type Vec2 = { x: number, y: number };

export namespace V2 {
    export function length({ x, y }: Vec2) {
        return (x * x + y * y) ** 0.5;
    }

    export function sub(a: Vec2, b: Vec2) {
        return {
            x: a.x - b.x, y: a.y - b.y
        }
    }

    export function add(a: Vec2, b: Vec2) {
        return {
            x: a.x + b.x, y: a.y + b.y
        }
    }

    export function distance(a: Vec2, b: Vec2) {
        return length(sub(a, b));
    }
}