import { Application, SCALE_MODES, settings }from "pixi.js";
import { Entity } from "./entity";
import genUUID from "./util";
import Dynamic, { stepDynamic } from "./dynamic";
import { Collidable, checkCollision } from "./collidable";
import controller from "./controller";

settings.SCALE_MODE = SCALE_MODES.NEAREST;



const World = {
  app: new Application({ resizeTo: window, antialias: false }),
  entities: new Map<string, Entity>(),
  generateId: () => genUUID(),
  removeEntity(id: string) {
    this.app.stage.removeChild(this.entities.get(id)!.sprite);
    this.entities.delete(id);
  },

  addEntity(entity: Entity) {
    this.app.stage.addChild(entity.sprite);
    this.entities.set(entity.id, entity);
  },

  step(dt: number) {
    for (let [_id, entity] of this.entities) entity.step(dt);
    this.stepDynamics(dt);
    this.stepCollisions(dt);
    controller.step();
  },

  stepDynamics(dt: number) {
    for (let [_id, entity] of this.entities) {
      if (entity?.is_dynamic) {
        stepDynamic(dt, entity as Dynamic);
      }
    }
  },

  stepCollisions(_dt: number) {
    // we need indexing
    const entities = [...this.entities.values()]
      .filter(e => e.is_collidable) as Collidable[];

    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const [a, b] = [entities[i], entities[j]];
        if (checkCollision(a, b)) {
          a.onCollision(b);
          b.onCollision(a);
        }
      }
    }
  },
};


document.body.appendChild(World.app.view as HTMLCanvasElement);
World.app.start();
World.app.ticker.maxFPS = 60;
World.app.ticker.minFPS = 60;
World.app.ticker.add(dt => World.step(dt));
World.app.stage.scale.set(5, 5);
// World.app.stage.

export default World;
