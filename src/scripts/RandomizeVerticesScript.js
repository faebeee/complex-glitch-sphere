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

        this.originalVerts = [];

        window.addEventListener('click', () => {
            this.randomize();
        });
    }

    onSetup() {
        // here we can setup all required data like access another component
        //once the scriptcomponent is added to the entity

        /** @var {THREEComponent} */
        this.threeComponent = this.entity.getComponents(THREEComponent)[0];
        this.originalVerts = [...this.threeComponent.mesh.geometry.vertices].map((o) => {
            return { ...o }
        });
        this.randomize();

    }

    randomize() {
        const geometry = this.threeComponent.mesh.geometry;

        const vLength = geometry.vertices.length;
        let counter = 0;
        for (let i = 0; i < vLength; i++) {
            const accelerateX = clamp(this.originalVerts[i].x);
            const accelerateY = clamp(this.originalVerts[i].y);
            const accelerateZ = clamp(this.originalVerts[i].z);

            geometry.vertices[i].x = this.originalVerts[i].x + Math.random() * this.amp * accelerateX;
            geometry.vertices[i].y = this.originalVerts[i].y + Math.random() * this.amp * accelerateY;
            geometry.vertices[i].z = this.originalVerts[i].z + Math.random() * this.amp * accelerateZ;

            counter += 3;
        }

        geometry.verticesNeedUpdate = true;
    }

    update() {

    }
}
