import { Sprite, Texture } from "pixi.js";
import Seed from "./seed";
import Upgrade from "./upgrade";
import Ammunition from "./ammunition";

const seedBase = "/assets/sproud-lands/items/farm-items/seeds-";

const allSeeds = [
  new Seed(Sprite.from(Texture.from(seedBase + "carrot.png")), "carrot", 10),
  new Seed(Sprite.from(Texture.from(seedBase + "wheat.png")), "wheat", 10),
  new Seed(Sprite.from(Texture.from(seedBase + "parsnip.png")), "parsnip", 10),
  new Seed(Sprite.from(Texture.from(seedBase + "cucumber.png")), "cucumber", 10),

  new Seed(Sprite.from(Texture.from(seedBase + "tomato.png")), "tomato", 30),
  new Seed(Sprite.from(Texture.from(seedBase + "corn.png")), "corn", 30),
  new Seed(Sprite.from(Texture.from(seedBase + "kale.png")), "kale", 30),

  new Seed(Sprite.from(Texture.from(seedBase + "cabbage.png")), "cabbage", 75),
  new Seed(Sprite.from(Texture.from(seedBase + "cauliflower.png")), "cauliflower", 75),

  new Seed(Sprite.from(Texture.from(seedBase + "pumpkin.png")), "pumpkin", 200),

  new Seed(Sprite.from(Texture.from(seedBase + "star.png")), "star", 515),
]

const gunUpgrades = [
  new Upgrade(Sprite.from(Texture.from(seedBase + "star.png")), "damage", 5),
  new Upgrade(Sprite.from(Texture.from(seedBase + "star.png")), "fire rate", 1),
]

const ammo = new Ammunition(Sprite.from(Texture.from("/assets/bullet.png")), 20)

export { allSeeds, gunUpgrades, ammo }
