import day from "./day";
import { Enemy, slimeSprite } from "./entity/enemy";
import World from "./world";

class MobSpawner {

  constructor(public spawnChance: number) {
    setInterval(() => this.tick(),500);
  }

  tick() {
    if (day.stage != "night") return;
    const roll = (Math.random() * 100) | 0

    if (roll + day.inGameDays * 2 <= this.spawnChance) {
      World.addEntity( new Enemy(slimeSprite(), 140, 200) );
    }

  }

}

const spawner = new MobSpawner(10);
export default spawner;
