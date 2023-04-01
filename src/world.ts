import { Application, SCALE_MODES, Sprite, Texture, settings } from "pixi.js";
import { Entity } from "./entity/entity";
import Dynamic, { stepDynamic } from "./entity/dynamic";
import { Collidable, checkCollision } from "./entity/collidable";
import controller from "./controller";
import { keepIn, pushOut } from "./utils/bbox";

settings.SCALE_MODE = SCALE_MODES.NEAREST;

const islandBounds = {
  min: {
    x: 48,
    y: 48,
  },
  max: {
    x: 128,
    y: 128,
  }
};

const houseBounds = {
  min: {
    x: 96 + 32,
    y: 48,
  },
  max: {
    x: 128 + 80,
    y: 128,
  }
};

const World = {
  // Used for mapping from window to pixel locations
  clientTopLeft: { x: 0, y: 0 },
  clientScale: 1,


  app: new Application({ resizeTo: window, antialias: false }),
  entities: new Map<string, Entity>(),
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

  islandCollision(entity: Dynamic) {
    keepIn(entity, islandBounds);
  },

  houseCollision(entity: Dynamic) {
    pushOut(entity, houseBounds);
  },
};

const background = new Sprite(Texture.from("assets/worldMap.png"));
World.app.stage.addChild(background);

document.body.appendChild(World.app.view as HTMLCanvasElement);
World.app.start();
World.app.ticker.maxFPS = 60;
World.app.ticker.minFPS = 60;
World.app.ticker.add(dt => World.step(dt));

const centerWorld = () => {
  const tileSize = 16;
  const worldWidth = 40;
  const worldHeight = 30;

  const worldPixelWidth = worldWidth * tileSize;
  const worldPixelHeight = worldHeight * tileSize;

  let worldScale = Math.min(window.innerHeight / worldPixelHeight, window.innerWidth / worldPixelWidth);

  const topOffset = (window.innerHeight - worldPixelHeight * worldScale) / 2;
  const leftOffset = (window.innerWidth - worldPixelWidth * worldScale) / 2;

  World.clientTopLeft.x = leftOffset;
  World.clientTopLeft.y = topOffset;
  World.clientScale = worldScale;

  World.app.stage.setTransform(leftOffset, topOffset, worldScale, worldScale);
}

centerWorld();

addEventListener("resize", () => {
  centerWorld();
});


export default World;
