import {
  Application,
  SCALE_MODES,
  Sprite,
  Texture,
  settings,
  Container,
  TilingSprite,
  Text,
  BaseTexture,
} from "pixi.js";
import { Entity } from "./entity/entity";
import Dynamic, { stepDynamic } from "./entity/dynamic";
import { Collidable, checkCollision } from "./entity/collidable";
import controller from "./controller";
import { keepIn, pushOut } from "./utils/bbox";
import day from "./day";
import ButtonBox from "./ToolBar";
import { V2, Vec2 } from "./utils/vec2";
import "./mobSpawner";
import { Nexus } from "./Nexus";

const PIXEL_SCALE = 4;
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

export const islandBounds = {
  min: {
    x: 72,
    y: 72,
  },
  max: {
    x: 72 + 16 * 31,
    y: 72 + 16 * 19.5,
  },
};

const houseBounds = {
  min: {
    x: 128 + 16,
    y: 72,
  },
  max: {
    x: 128 + 112,
    y: 128 + 16,
  },
};

const World = {
  // Used for mapping from window to pixel locations
  clientTopLeft: { x: 0, y: 0 },
  clientScale: 1,

  cameraPos: { x: 0, y: 0 },

  container: new Container(),
  uiContainer: new Container(),

  app: new Application({ resizeTo: window, antialias: false }),

  entities: new Map<string, Entity>(),
  timeIndicator: new Text(),

  removeEntity(id: string) {
    let sprite = this.entities.get(id)?.sprite;
    if (sprite) {
      sprite.parent.removeChild(sprite);
      this.entities.delete(id);
    }
  },

  addEntity(entity: Entity) {
    this.container.addChild(entity.sprite);
    this.entities.set(entity.id, entity);
  },

  addUi(element: Entity) {
    this.uiContainer.addChild(element.sprite);
    this.entities.set(element.id, element);
  },

  step(dt: number) {
    day.tick(dt);
    this.timeIndicator.text = day.getString();
    for (let [_id, entity] of this.entities) entity.step(dt);
    this.stepDynamics(dt);
    this.stepCollisions(dt);
    controller.step();

    // if (day.getHour() > 19 && day.getHour() < 3) {
    //
    // }
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

          if (a.mass && b.mass) {
            const delta = V2.sub(a.sprite.position, b.sprite.position);
            let v = V2.normalized(delta);
            let dist = V2.length(delta);
            let power = -(dist - (a.radius + b.radius));

            a.velocity.x += (v.x * power) / 50;
            a.velocity.y += (v.y * power) / 50;
            b.velocity.x -= (v.x * power) / 50;
            b.velocity.y -= (v.y * power) / 50;
          }
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

  updateCamera(playerPosition: Vec2) {
    const camera = this.container;

    this.cameraPos.x -= (this.cameraPos.x - playerPosition.x) / 15;
    this.cameraPos.y -= (this.cameraPos.y - playerPosition.y) / 15;
    camera.pivot.set(this.cameraPos.x, this.cameraPos.y);
  },
};

document.body.appendChild(World.app.view as HTMLCanvasElement);
World.app.ticker.maxFPS = 60;
World.app.ticker.minFPS = 60;
World.app.ticker.add((dt) => World.step(dt));
World.uiContainer.addChild(World.timeIndicator);
World.app.start();

let waterTiled = new TilingSprite(
  Texture.from("assets/sproud-lands/tilesets/water frames/Water_1.png"),
  4096,
  4096
);
const background = new Sprite(Texture.from("assets/worldMap.png"));

World.container.addChild(waterTiled);
World.container.addChild(background);

World.app.stage.addChild(World.container);
World.app.stage.addChild(World.uiContainer);
const centerWorld = () => {
  const topOffset = window.innerHeight / 2;
  const leftOffset = window.innerWidth / 2;

  World.clientTopLeft.x = leftOffset;
  World.clientTopLeft.y = topOffset;
  World.clientScale = PIXEL_SCALE;

  World.container.setTransform(leftOffset, topOffset, PIXEL_SCALE, PIXEL_SCALE);

  World.addUi(
    new ButtonBox(
      leftOffset / PIXEL_SCALE - 96 / 2,
      (topOffset / PIXEL_SCALE) * 2 - 38
    )
  );
};
World.addEntity(new Nexus());

World.uiContainer.setTransform(0, 0, PIXEL_SCALE, PIXEL_SCALE);

waterTiled.position.x = -2048;
waterTiled.position.y = -2048;

centerWorld();

addEventListener("resize", () => {
  centerWorld();
});

export default World;
