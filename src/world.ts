import { Entity } from "./entity";

const World = {
    entities: {} as Record<string, Entity>,
    generateId: () => "",
} as const;

export default World;