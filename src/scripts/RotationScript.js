import { Script } from 'complex-scripting';
import { THREEComponent } from 'complex-threejs';

export default class RotationScript extends Script {
    /**
     *
     * @param{ {x: number, y: number, z: number}} speed
     * @param {{x: number, y: number, z: number}} initialRotation
     */
    constructor(speed, initialRotation = { x: 0, y: 0, z: 0 }) {
        super();
        this.speed = speed;
        this.initialRotation = initialRotation;
    }

    onSetup() {
        // here we can setup all required data like access another component
        //once the scriptcomponent is added to the entity

        /** @var {THREEComponent} */
        this.threeComponent = this.entity.getComponents(THREEComponent)[0];

        this.threeComponent.mesh.rotation.x = this.initialRotation.x;
        this.threeComponent.mesh.rotation.y = this.initialRotation.y;
        this.threeComponent.mesh.rotation.z = this.initialRotation.z;
    }

    update() {
        this.threeComponent.mesh.rotation.x += this.speed.x;
        this.threeComponent.mesh.rotation.y += this.speed.y;
        this.threeComponent.mesh.rotation.z += this.speed.z;
    }
}
