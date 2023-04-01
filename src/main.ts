import "./style.css";
import "./world";
import "./entity/enemy";
import "./entity/merchant";
import "./entity/player";
import "./garden";
import day from "./day";

console.log(day);

import FontFaceObserver from 'fontfaceobserver';

let font = new FontFaceObserver('Pixelated', {});
font.load().then(() => console.log('font loaded.'));
