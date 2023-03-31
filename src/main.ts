import { Sprite, Texture } from 'pixi.js';
import './style.css'

import World from './world'

World.addEntity({
    id: 'blahblah',
    size: 0,
    sprite: new Sprite(Texture.from("assets/sproud-lands/objects/Boats.png")),
    step: function (dt: number): void {
        this.sprite.position.x += 1 * dt;
        // throw new Error('Function not implemented.');
    }
})

console.log(World.entities);
