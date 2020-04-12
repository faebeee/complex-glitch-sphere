import { Complex } from 'complex-engine';
import MyScene from './Scene';

const cx = Complex.getInstance();
cx.loadScene(new MyScene());

function render() {
    cx.update();
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
