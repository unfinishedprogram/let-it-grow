import { Application, SCALE_MODES, Texture, settings } from "pixi.js";
import { Entity } from "./entity/entity";
import { genUUID } from "./utils/util";
import Dynamic, { stepDynamic } from "./entity/dynamic";
import { Collidable, checkCollision } from "./entity/collidable";
import controller from "./controller";
import Button from "./Button";
import ButtonBox from "./ButtonBox";

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
    const entities = [...this.entities.values()].filter(
      (e) => e.is_collidable
    ) as Collidable[];

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
World.app.ticker.add((dt) => World.step(dt));
World.app.stage.scale.set(5, 5);
World.addEntity(new ButtonBox(132, 102));
World.addEntity(
  new Button(
    Texture.from("/assets/buttons/seedPressed.png"),
    Texture.from("/assets/buttons/seedButton.png"),
    134.25,
    102.5,
    () => console.log("clicked"),
    1
  )
);
World.addEntity(
  new Button(
    Texture.from("/assets/buttons/hoePressed.png"),
    Texture.from("/assets/buttons/hoeButton.png"),
    168.5,
    102.5,
    () => console.log("clicked"),
    2
  )
);
World.addEntity(
  new Button(
    Texture.from("/assets/buttons/riflePressed.png"),
    Texture.from("/assets/buttons/rifleButton.png"),
    202.75,
    102.5,
    () => console.log("clicked"),
    3
  )
);
// World.app.stage.

export default World;
