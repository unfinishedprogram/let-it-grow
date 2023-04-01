import { Sprite, Texture } from "pixi.js";
import Gun from "./gun";
import Seed from "./seed";
import Upgrade from "./upgrade";

const seedBase = "/assets/sproud-lands/items/farm-items/seeds-";

// new Gun(sprite, name, cost, damage, reload, fire rate, projectiles, max ammo, range, dps)
const allGuns = [
  new Gun(null, "revolver", 0, 20, 1, 2, 1, 6, 20, 40),
  new Gun(null, "shotgun", 1, 10, 1.2, 6, 1, 20, 40, 60),
  new Gun(null, "assaut rifle", 1, 10, 1, 2, 4, 2, 8, 80),
]

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
  new Upgrade("damage", 5),
  new Upgrade("reload", 0.2),
  new Upgrade("fire rate", 1),
]

export { allGuns, allSeeds, gunUpgrades }
