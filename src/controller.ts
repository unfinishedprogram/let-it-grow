import { Vec2, V2 } from "./utils/vec2";
import World from "./world";

type Key = {
  isPressed: boolean;
  key: string;
  onClick(): void;
};

class Controller {
  aKey: Key = {
    key: "a",
    onClick: () => (this.directionVector.x -= 1),
    isPressed: false,
  };

  sKey: Key = {
    key: "s",
    onClick: () => (this.directionVector.y += 1),
    isPressed: false,
  };

  dKey: Key = {
    key: "d",
    onClick: () => (this.directionVector.x += 1),
    isPressed: false,
  };

  wKey: Key = {
    key: "w",
    onClick: () => (this.directionVector.y -= 1),
    isPressed: false,
  };

  oneKey: Key = {
    key: "1",
    onClick: () => (this.selectedItem = 1),
    isPressed: false,
  };

  twoKey: Key = {
    key: "2",
    onClick: () => (this.selectedItem = 2),
    isPressed: false,
  };

  threeKey: Key = {
    key: "3",
    onClick: () => (this.selectedItem = 3),
    isPressed: false,
  };

  keys = [
    this.aKey,
    this.sKey,
    this.dKey,
    this.wKey,
    this.oneKey,
    this.twoKey,
    this.threeKey,
  ];

  numKeys = [this.oneKey, this.twoKey, this.threeKey];

  selectedItem: number = 0;
  directionVector: Vec2 = { x: 0, y: 0 };
  mousePosition: Vec2 = { x: 0, y: 0 };

  constructor() {
    window.addEventListener("keydown", (ev) => this.downListener(ev));
    window.addEventListener("keyup", (ev) => this.upListener(ev));
    window.addEventListener("mousemove", (ev) => this.mouseListener(ev));
  }

  addKey(key: Key) {
    this.keys.push(key);
  }

  downListener(ev: KeyboardEvent) {
    const targetKey = this.keys.find((key) => ev.key.toLowerCase() == key.key);
    if (targetKey) {
      targetKey.isPressed = true;
    }
  }

  upListener(ev: KeyboardEvent) {
    const targetKey = this.keys.find((key) => ev.key.toLowerCase() == key.key);
    if (targetKey) {
      targetKey.isPressed = false;
    }
  }

  mouseListener(e: MouseEvent) {
    this.mousePosition.x =
      (e.clientX - World.clientTopLeft.x) / World.clientScale;
    this.mousePosition.y =
      (e.clientY - World.clientTopLeft.y) / World.clientScale;
  }

  step() {
    this.directionVector.x = 0;
    this.directionVector.y = 0;

    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i].isPressed) {
        this.keys[i].onClick();
      }
    }
    this.directionVector = V2.normalized(this.directionVector);
  }
}

export default new Controller();
