import { AnimatedSprite, BaseTexture, SCALE_MODES, Spritesheet } from "pixi.js";
import { Combatible } from "../entity/combatable";
import { Entity } from "../entity/entity";

export function isFightable(entity: Entity): entity is Combatible {
  return 'combatSystem' in entity && entity.is_collidable == true;
}

export async function loadSpriteSheet(json: { meta: { image: string } }, pathToAsset: string, animationSpeed: number) {
  json.meta.image = pathToAsset + "/" + json.meta.image;
  const spriteSheet = new Spritesheet(BaseTexture.from(json.meta.image), json as any);
  await spriteSheet.parse();
  spriteSheet.baseTexture.scaleMode = SCALE_MODES.NEAREST;

  const animation = new AnimatedSprite(Object.values(spriteSheet.animations)[0]);

  return () => {
    let anim = new AnimatedSprite(animation.textures);

    anim.anchor.set(0.5, 0.5);
    anim.animationSpeed = animationSpeed;
    anim.play();
    return anim;
  }
}



