import { Application, Texture } from "pixi.js";
import { Entity } from "./entity";



const World = {
    app: new Application({ resizeTo: window }),
    entities: new Map<string, Entity>(),
    generateId: () => "",

    removeEntity(id: string) {
        this.app.stage.removeChild(this.entities.get(id)!.sprite);
        this.entities.delete(id);
    },

    addEntity(entity: Entity) {
        this.app.stage.addChild(entity.sprite);
        this.entities.set(entity.id, entity);
    },

    step(dt: number) {
        console.log(this.entities);
        for (let [_id, entity] of this.entities) {
            entity.step(dt)
        }
    }
};


document.body.appendChild(World.app.view as HTMLCanvasElement);
World.app.start();
World.app.ticker.maxFPS = 60;
World.app.ticker.minFPS = 60;
World.app.ticker.add(dt => World.step(dt));

export default World;