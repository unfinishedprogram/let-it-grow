import { Sprite, Texture } from "pixi.js";
import Gun from "./gun";
import Seed from "./seed";
import Upgrade from "./upgrade";

const seedBase = "assets/sproud-land/items/farm-items/seeds-";

// new Gun(sprite, name, cost, damage, reload, fire rate, projectiles, max ammo, range, dps)
const allGuns = [
  new Gun(null, "revolver", 0, 20, 1, 2, 1, 6, 20, 40),
  new Gun(null, "shotgun", 1, 10, 1.2, 6, 1, 20, 40, 60),
  new Gun(null, "assaut rifle", 1, 10, 1, 2, 4, 2, 8, 80),
]

const allSeeds = [
  new Seed(Sprite.from(Texture.from(seedBase + "carrot")), "carrot", 10),
  new Seed(Sprite.from(Texture.from(seedBase + "wheat")), "wheat", 10),
  new Seed(Sprite.from(Texture.from(seedBase + "parsnip")), "parsnip", 10),
  new Seed(Sprite.from(Texture.from(seedBase + "cucumber")), "cucumber", 10),

  new Seed(Sprite.from(Texture.from(seedBase + "tomato")), "tomato", 30),
  new Seed(Sprite.from(Texture.from(seedBase + "corn")), "corn", 30),
  new Seed(Sprite.from(Texture.from(seedBase + "kale")), "kale", 30),

  new Seed(Sprite.from(Texture.from(seedBase + "cabbage")), "cabbage", 75),
  new Seed(Sprite.from(Texture.from(seedBase + "cauliflower")), "cauliflower", 75),

  new Seed(Sprite.from(Texture.from(seedBase + "pumpkin")), "pumpkin", 200),

  new Seed(Sprite.from(Texture.from(seedBase + "star")), "star", 515),
]

const gunUpgrades = [
  new Upgrade("damage", 5),
  new Upgrade("reload", 0.2),
  new Upgrade("fire rate", 1),
]

export { allGuns, allSeeds, gunUpgrades }