import { AdjustmentFilter } from "pixi-filters";
import World from "./world";
import { sound } from "@pixi/sound";

sound.add('music', '/assets/background_music.wav');
sound.play('music');

class Day {
  time: number = 64000;
  inGameDays = 0;
  // Compared to real life, so 60 would be 1 minute per second
  inGameSpeed = 300 * 200;
  stage: 'day' | 'night' = 'day';
  nightTimeStart = 18;
  dayTimeStart = 5;
  paused = false;

  adjustmentFilterParameters = {
    saturation: 1,
    brightness: 1,
    blue: 1,
    contrast: 1,
  }

  adjustmentFilter = new AdjustmentFilter(this.adjustmentFilterParameters);


  tick(delta: number) {
    if (this.paused) this.time += 0
    else this.time += delta / 115 * this.inGameSpeed;

    if (this.getHour() >= this.nightTimeStart && this.getHour() < 20) {
      this.stage = 'night';
      this.adjustmentFilter.saturation -= 0.00025 * delta;
      this.adjustmentFilter.brightness -= 0.0003 * delta;
      this.adjustmentFilter.blue += 0.0001 * delta;
    } else if (this.getHour() >= this.dayTimeStart && this.getHour() < 7) {
      if (this.stage == "night") {
        this.inGameDays += 1;
      }
      this.stage = 'day';
      this.adjustmentFilter.saturation += 0.00025 * delta;
      this.adjustmentFilter.brightness += 0.0003 * delta;
      this.adjustmentFilter.blue -= 0.0001 * delta;
    }

    World.app.stage.filters = [this.adjustmentFilter];
  }

  // new AdjustmentFilter({
  //   saturation: 0.4,
  //   brightness: 0.5,
  //   blue: 1.2,
  //   contrast: 1,
  getHour() {
    return ((this.time / 3600) | 0) % 24;
  }

  getMintues() {
    return ((this.time / 60) | 0) % 60;
  }

  getSeconds() {
    return (this.time % 60) | 0;
  }

  getString() {
    const minutes = `${this.getMintues()}`.padStart(2, "0");
    const hours = `${this.getHour()}`.padStart(2, "0");
    return `${hours}:${minutes}`
  }

  startNight() {
  }

}

const day = new Day();

export default day;
