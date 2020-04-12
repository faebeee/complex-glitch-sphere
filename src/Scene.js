import { Scene } from 'complex-engine';
import RenderSystem from './RenderSystem';

export default class MyScene extends Scene {
    constructor() {
        super('MyScene');
    }

    load() {
        // Setup your environment here
        // add entities, systems and managers to the this.world instance

        this.world.addSystem(new RenderSystem());
    }
}
