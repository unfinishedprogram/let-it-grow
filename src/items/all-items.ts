import { Sprite, Texture } from "pixi.js";
import Upgrade from "./upgrade";
import Ammunition from "./ammunition";

const seedBase = "/assets/sproud-lands/items/farm-items/seeds-";

const gunUpgrades = [
  new Upgrade(Sprite.from(Texture.from(seedBase + "star.png")), "damage", 5),
  new Upgrade(Sprite.from(Texture.from(seedBase + "star.png")), "fire rate", 1),
]

const ammo = new Ammunition(Sprite.from(Texture.from("/assets/bullet.png")), 20)
export { gunUpgrades, ammo }
