import { Scene } from 'complex-engine';
import { ScriptComponent, ScriptSystem } from 'complex-scripting';
import { THREEComponent, THREESystem } from 'complex-threejs';
import * as THREE from 'three';
import RandomizeVerticesScript from '../scripts/RandomizeVerticesScript';
import RotationScript from '../scripts/RotationScript';

export default class MyScene extends Scene {
    constructor() {
        super('MyScene');

        this.renderer = new THREE.WebGLRenderer({ alpha: false });
        this.renderer.setSize(window.innerWidth, innerHeight);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 20, 80);
        this.camera.lookAt(0, 0, 0);
    }

    load() {
        // Setup your environment here
        // add entities, systems and managers to the this.world instance
        const threeSystem = new THREESystem(this.camera, null, this.renderer);
        threeSystem.renderer.shadowMap.enabled = true;
        this.world.addVoidSystem(threeSystem);
        this.world.addEntitySystem(new ScriptSystem());

        this.createLight(0, 30, 25);
        this.createLight(0, -30, 10, '#ff0000');
        this.createLight(-30, 0, 0, '#31ecb7');
        this.createLight(30, 0, 0, '#31ecb7');
        this.setupSphere();

    }

    createLight(x, y, z, color = '#fffff0') {
        const light = new THREE.PointLight(color, 0.5, 100);
        light.castShadow = true;
        light.position.set(x, y, z);
        this.world.createEntity([new THREEComponent(light)]);
    }

    setupSphere() {
        const segments = 32;
        const geometry = new THREE.SphereGeometry(15, segments, segments);
        const material = new THREE.MeshPhongMaterial({ flatShading: true });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;

        this.world.createEntity([
            new THREEComponent(cube),
            new ScriptComponent(new RandomizeVerticesScript(20)),
            new ScriptComponent(new RotationScript(
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 0, z: 0 })
            ),
        ]);
    }
}
