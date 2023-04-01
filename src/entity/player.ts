import { Container, Sprite, Text } from "pixi.js";
import { Collidable, PLAYER_MASK } from "./collidable";
import controller from "../controller";
import { V2, Vec2 } from "../utils/vec2";
import World from "../world";

import { down, left, right, up } from "./player_anims";
import { Combatible, CombatSystem } from "./combatable";
import { rifle, pistol, shotgun } from "../items/rifle";
import Gun from "../items/gun";
import day from "../day";

const guns = [
  rifle,
  pistol,
  shotgun
]

class Player implements Combatible {
  id = "player";
  is_collidable: true = true;
  is_dynamic: true = true;
  velocity: Vec2 = { x: 0, y: 0 };
  radius: number = 1;
  mass: number = 1;
  drag = 1;
  is_fightable = true;
  public collision_mask: number = PLAYER_MASK;

  container = new Container();
  debugText = new Text('test text', { fill: 'white', fontSize: '1rem' });
  selectedGun: Gun = pistol;

  combatSystem: CombatSystem = {
    isRecharging: false,
    radius: 1,
    hp: 20,
    maxHP: 20,
    damage: 10,
    rechargeTime: 0,
  }


  private animationTable = [
    up,
    right,
    left,
    down
  ]

  onCollision(_other: Collidable) { }

  onHit(combatible: Combatible) {
    this.combatSystem.hp -= combatible.combatSystem.damage;
  }

  shootProjectile() {
    if (day.stage == 'day') return;
    this.selectedGun = guns[controller.selectedItem - 1];
    const normalizedVelocity = V2.normalized(
      V2.sub(controller.mousePosition, this.sprite.position)
    );

    this.selectedGun.fire(normalizedVelocity, this.sprite.position);
  }


  constructor(public sprite: Sprite) {
    this.sprite.addChild(this.container);
    this.debugText.anchor.set(0.5, 1);
    this.container.addChild(this.debugText);

    window.addEventListener('mousedown', () => this.shootProjectile());

  }

  step(_dt: number): void {
    World.updateCamera(player.sprite.position);
    this.debugText.text = World.app.stage.pivot.x;
    this.velocity = V2.multiplyScalar(controller.directionVector, 2);

    let selectedSprite: Sprite;
    if (this.velocity.y != 0) {
      selectedSprite = this.animationTable[Math.sign(this.velocity.y) < 0 ? 0 : 3];
    } else if (this.velocity.x != 0) {
      selectedSprite = this.animationTable[Math.sign(this.velocity.x) < 0 ? 2 : 1];
    } else {
      selectedSprite = this.animationTable[3];
    }
    if (selectedSprite != this.sprite) {
      this.sprite.texture = selectedSprite.texture;
    }

    World.islandCollision(this);
    World.houseCollision(this);
  }
}

let player: Player = new Player(down);
World.addEntity(player);
