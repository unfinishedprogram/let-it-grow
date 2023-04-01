import { loadSpriteSheet } from "../utils/util";


import aubergineJson from "../../public/assets/json-spritesheets/plants/aubergine.json";
import cabbageJson from "../../public/assets/json-spritesheets/plants/cabbage.json";
import carrotJson from "../../public/assets/json-spritesheets/plants/carrot.json";
import cauliflowerJson from "../../public/assets/json-spritesheets/plants/cauliflower.json";
import cornJson from "../../public/assets/json-spritesheets/plants/corn.json";
import cucumberJson from "../../public/assets/json-spritesheets/plants/cucumber.json";
import kaleJson from "../../public/assets/json-spritesheets/plants/kale.json";
import parsnipJson from "../../public/assets/json-spritesheets/plants/parsnip.json";
import pumpkinJson from "../../public/assets/json-spritesheets/plants/pumpkin.json";
import starJson from "../../public/assets/json-spritesheets/plants/star.json";
import tomatoJson from "../../public/assets/json-spritesheets/plants/tomato.json";

export const aubergineSprite = await loadSpriteSheet(aubergineJson, "/assets/json-spritesheets/plants/", 1.0);
export const cabbageSprite = await loadSpriteSheet(cabbageJson, "/assets/json-spritesheets/plants/", 1.0);
export const carrotSprite = await loadSpriteSheet(carrotJson, "/assets/json-spritesheets/plants/", 1.0);
export const cauliflowerSprite = await loadSpriteSheet(cauliflowerJson, "/assets/json-spritesheets/plants/", 1.0);
export const cornSprite = await loadSpriteSheet(cornJson, "/assets/json-spritesheets/plants/", 1.0);
export const cucumberSprite = await loadSpriteSheet(cucumberJson, "/assets/json-spritesheets/plants/", 1.0);
export const kaleSprite = await loadSpriteSheet(kaleJson, "/assets/json-spritesheets/plants/", 1.0);
export const parsnipSprite = await loadSpriteSheet(parsnipJson, "/assets/json-spritesheets/plants/", 1.0);
export const pumpkinSprite = await loadSpriteSheet(pumpkinJson, "/assets/json-spritesheets/plants/", 1.0);
export const starSprite = await loadSpriteSheet(starJson, "/assets/json-spritesheets/plants/", 1.0);
export const tomatoSprite = await loadSpriteSheet(tomatoJson, "/assets/json-spritesheets/plants/", 1.0);