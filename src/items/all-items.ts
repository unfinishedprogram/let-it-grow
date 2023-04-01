import Gun from "./gun";
import Seed from "./seed";

// new Gun(sprite, name, cost, damage, reload, fire rate, projectiles, max ammo, range, dps)
const allGuns = [
  new Gun(null, "revolver", 0, 20, 1, 2, 1, 6, 20, 40),
  new Gun(null, "shotgun", 1, 10, 1.2, 6, 1, 20, 40, 60),
  new Gun(null, "assaut rifle", 1, 10, 1, 2, 4, 2, 8, 80),
]

const allSeeds = [
  new Seed(null, "carrot", 10),
  new Seed(null, "wheat", 10),
  new Seed(null, "parsnip", 10),
  new Seed(null, "cucumber", 10),

  new Seed(null, "tomato", 30),
  new Seed(null, "corn", 30),
  new Seed(null, "kale", 30),

  new Seed(null, "cabbage", 75),
  new Seed(null, "cauliflower", 75),

  new Seed(null, "pumpkin", 200),

  new Seed(null, "star", 515),
]

export { allGuns, allSeeds }