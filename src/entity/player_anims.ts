import downJ from "../../public/assets/json-spritesheets/walking_down.json";
import rightJ from "../../public/assets/json-spritesheets/walking_right.json";
import leftJ from "../../public/assets/json-spritesheets/walking_left.json";
import upJ from "../../public/assets/json-spritesheets/walking_up.json";
import { loadSpriteSheet } from "../utils/util";


const down = await loadSpriteSheet(downJ, "/assets/json-spritesheets/", 0.4);
const right = await loadSpriteSheet(rightJ, "/assets/json-spritesheets/", 0.4);
const left = await loadSpriteSheet(leftJ, "/assets/json-spritesheets/", 0.4);
const up = await loadSpriteSheet(upJ, "/assets/json-spritesheets/", 0.4);

export {down, right, left, up}
