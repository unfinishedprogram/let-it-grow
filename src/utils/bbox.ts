import { Vec2 } from "./vec2";

export function inBounds(min: Vec2, max: Vec2, point: Vec2): boolean {
  if (point.x < min.x) return false;
  if (point.y < min.y) return false;
  if (point.x > max.x) return false;
  if (point.y > max.y) return false;
  return true;
}
