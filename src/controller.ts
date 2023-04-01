import { Vec2, V2 } from "./vec2"


type Key = {
  isPressed: boolean;
  key: string;
  onClick(): void;
}

class Controller {
  aKey: Key = {
    key: 'a',
    onClick: () => this.directionVector.x -= 1,
    isPressed: false,
  }

  sKey: Key = {
    key: 's',
    onClick: () => this.directionVector.y += 1,
    isPressed: false,
  }

  dKey: Key = {
    key: 'd',
    onClick: () => this.directionVector.x += 1,
    isPressed: false,
  }

  wKey: Key = {
    key: 'w',
    onClick: () => this.directionVector.y -= 1,
    isPressed: false,
  }

  keys = [this.aKey, this.sKey, this.dKey, this.wKey];

  directionVector: Vec2 = {x: 0, y: 0};

  constructor() {
    window.addEventListener("keydown", (ev) => this.downListener(ev));
    window.addEventListener("keyup", (ev) => this.upListener(ev));
  }

  addKey(key: Key){ 
    this.keys.push(key);
  }

  downListener(ev: KeyboardEvent) {
    const targetKey = this.keys.find(key => ev.key == key.key);
    if (targetKey) {
      targetKey.isPressed = true;
    }
  }

  upListener(ev: KeyboardEvent) {
    const targetKey = this.keys.find(key => ev.key == key.key);
    if (targetKey) {
      targetKey.isPressed = false;
    }
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

