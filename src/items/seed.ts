import { AnimatedSprite, Texture } from "pixi.js";
import * as plantSprites from "./plantSprites";

const seedBase = "/assets/sproud-lands/items/farm-items/seeds-";



// Grow time in days,
const seeds = {
  "carrot": { price: 10, growTime: 1 },
  "parsnip": { price: 10, growTime: 1 },
  "cucumber": { price: 10, growTime: 1 },
  "tomato": { price: 30, growTime: 2 },
  "corn": { price: 30, growTime: 2 },
  "kale": { price: 30, growTime: 2 },
  "cabbage": { price: 75, growTime: 4 },
  "cauliflower": { price: 75, growTime: 4 },
  "pumpkin": { price: 200, growTime: 5 },
  "star": { price: 515, growTime: 7 },
};

// TODO: Change this
export const daysToFrames = (days: number) => days * 1000;

for (let name in seeds) {
  (seeds[name as keyof typeof seeds] as any).seedTexture = Texture.from(`${seedBase}${name}.png`);
  (seeds[name as keyof typeof seeds] as any).plantTexture = (plantSprites as any)[`${name}Sprite`];
}

type Seeds = {
  [K in keyof typeof seeds]: (typeof seeds)[K] & {
    seedTexture: Texture,
    plantTexture: () => AnimatedSprite,
  }
}

export type SeedName = keyof typeof seeds;
export default seeds as Seeds;