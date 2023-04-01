import { Container, Sprite, Text } from "pixi.js";
import { Collidable, PLAYER_MASK } from "./collidable";
import controller from "../controller";
import { V2, Vec2 } from "../utils/vec2";
import World from "../world";

import { down, left, right, up } from "./player_anims";
import { Combatible, CombatSystem } from "./combatable";
import { instantiateWeakProjectile } from "./projectile";

class Player implements Combatible {
  id = "player";
  is_collidable: true = true;
  is_dynamic: true = true;
  velocity: Vec2 = { x: 0, y: 0 };
  radius: number = 1;
  mass: number = 1;
  is_fightable = true;
  public collision_mask: number = PLAYER_MASK;


  container = new Container();
  debugText = new Text('test text', { fill: 'white', fontSize: '1rem' });

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

  onCollision(other: Collidable) {
  }

  onHit(combatible: Combatible) {
    this.combatSystem.hp -= combatible.combatSystem.damage;
    console.log("Current hp: ", this.combatSystem.hp);
  }

  shootProjectile() {
    // controller.mousePosition
    const normalizedVelocity = V2.normalized(
      V2.sub(controller.mousePosition, this.sprite.position)
    );

    instantiateWeakProjectile(normalizedVelocity, this.sprite.position);
  }


  constructor(public sprite: Sprite) {
    this.sprite.addChild(this.container);
    this.debugText.anchor.set(0.5, 1);
    this.container.addChild(this.debugText);

    window.addEventListener('mousedown', () => this.shootProjectile());

  }

  step(_dt: number): void {
    this.velocity = V2.multiplyScalar(controller.directionVector, 4);

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
