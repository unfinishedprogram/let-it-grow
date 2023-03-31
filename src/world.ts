import { Application, Texture } from "pixi.js";
import { Entity } from "./entity";

const World = {
    app: new Application({ resizeTo: window }),
    entities: {} as Record<string, Entity>,
    generateId: () => "",

    removeEntity(id: string) {
        this.app.stage.removeChild(this.entities[id].sprite);
        delete this.entities[id];
    },

    addEntity(entity: Entity) {
        this.app.stage.addChild(entity.sprite);
        this.entities[entity.id] = entity;
    },

    step: function (dt: number) {
        console.log(dt)
        for (let entity in this.entities) {
            this.entities[entity].step(dt)
        }
    }
} as const;


document.body.appendChild(World.app.view as HTMLCanvasElement);
World.app.start();
World.app.ticker.maxFPS = 60;
World.app.ticker.minFPS = 60;
World.app.ticker.add(World.step);

export default World;