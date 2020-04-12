import { Scene } from 'complex-engine';
import { ScriptComponent, ScriptSystem } from 'complex-scripting';
import { THREEComponent, THREESystem } from 'complex-threejs';
import * as THREE from 'three';
import RandomizeVerticesScript from '../scripts/RandomizeVerticesScript';
import RotationScript from '../scripts/RotationScript';

export default class MyScene extends Scene {
    constructor() {
        super('MyScene');
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 80);
        this.camera.lookAt(0, 0, 0);
    }

    load() {
        // Setup your environment here
        // add entities, systems and managers to the this.world instance
        const threeSystem = new THREESystem(this.camera);
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
        const light = new THREE.PointLight(color, 1, 200);
        light.castShadow = true;
        light.position.set(x, y, z);
        this.world.createEntity([new THREEComponent(light)]);
    }

    setupSphere() {
        const segments = 16;
        const geometry = new THREE.SphereGeometry(10, segments, segments);
        const material = new THREE.MeshPhongMaterial({ color: '#51a9ff', flatShading: true });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;

        this.world.createEntity([
            new THREEComponent(cube),
            new ScriptComponent(new RandomizeVerticesScript(25)),
            new ScriptComponent(new RotationScript(
                { x: 0, y: 0, z: 0 },
                { x: Math.random(), y: Math.random(), z: Math.random() })
            ),
        ]);
    }
}
