import { Script } from 'complex-scripting';
import { THREEComponent } from 'complex-threejs';


function clamp(number, min = -1, max = 1) {
    return Math.max(min, Math.min(number, max));
}

export default class RandomizeVerticesScript extends Script {
    /**
     *
     * @param {number} amplifier
     */
    constructor(amplifier) {
        super();

        /** @var {number} */
        this.amp = amplifier;
    }

    onSetup() {
        // here we can setup all required data like access another component
        //once the scriptcomponent is added to the entity

        /** @var {THREEComponent} */
        this.threeComponent = this.entity.getComponents(THREEComponent)[0];
        const geometry = this.threeComponent.mesh.geometry;

        const vLength = geometry.vertices.length;
        let counter = 0;
        for (let i = 0; i < vLength; i++) {
            const accelerateX = clamp(geometry.vertices[i].x);
            const accelerateY = clamp(geometry.vertices[i].y);
            const accelerateZ = clamp(geometry.vertices[i].z);

            geometry.vertices[i].x += Math.random() * this.amp * accelerateX;
            geometry.vertices[i].y += Math.random() * this.amp * accelerateY;
            geometry.vertices[i].z += Math.random() * this.amp * accelerateZ;

            counter += 3;
        }

        geometry.verticesNeedUpdate = true;
    }

    update() {
    }
}
