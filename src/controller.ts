import { Vec2 } from "./vec2"

const SCREEN_SCALE = 0.2;

const positionVector: Vec2 = { x: 0, y: 0 };

type Key = {
  isPressed: boolean;
  key: string;
  onClick(): void;
}

const aKey: Key = {
  key: 'a',
  onClick: () => positionVector.x -= 1,
  isPressed: false,
}

const sKey: Key = {
  key: 's',
  onClick: () => positionVector.y -= 1,
  isPressed: false,
}

const dKey: Key = {
  key: 'd',
  onClick: () => positionVector.x += 1,
  isPressed: false,
}

const wKey: Key = {
  key: 'w',
  onClick: () => positionVector.y += 1,
  isPressed: false,
}

const keys = [aKey, sKey, dKey, wKey];

class Controller {
  public directionVector = positionVector;
  public mousePosition = { x: 0, y: 0 };

  constructor() {
    window.addEventListener("keydown", this.downListener.bind(this))
    window.addEventListener("keyup", this.downListener.bind(this))
  }

  addKey(key: Key) {
    keys.push(key);
  }

  downListener(ev: KeyboardEvent) {
    const targetKey = keys.find(key => ev.key == key.key);
    if (targetKey) {
      targetKey.isPressed = true;
    }
  }

  upListener(ev: KeyboardEvent) {
    const targetKey = keys.find(key => ev.key == key.key);
    if (targetKey) {
      targetKey.isPressed = false;
    }
  }

  mouseListener(e: MouseEvent) {
    this.mousePosition.x = e.clientX * SCREEN_SCALE;
    this.mousePosition.y = e.clientY * SCREEN_SCALE;
  }

  step() {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].isPressed) {
        keys[i].onClick();
      }
    }
  }

}

export default new Controller();

