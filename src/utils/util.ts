import { AnimatedSprite, BaseTexture, Spritesheet } from "pixi.js";
function uuidDigit() {
    return ((Math.random() * 0xFFFF) | 0).toString(16).padStart(4, "0");
}

export function genUUID(): string {
    return `${uuidDigit()}-${uuidDigit()}-${uuidDigit()}-${uuidDigit()}`;
}

export async function loadSpriteSheet(json: {meta: {image: string} }, pathToAsset: string, animationSpeed: number) {
  json.meta.image = pathToAsset + "/" + json.meta.image;
  const spriteSheet = new Spritesheet(BaseTexture.from(json.meta.image), json as any);
  await spriteSheet.parse();
  const anim = new AnimatedSprite(Object.values(spriteSheet.animations)[0]);
  anim.animationSpeed = animationSpeed;
  anim.play();
  return anim;
}
