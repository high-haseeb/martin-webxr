import * as TWEEN from "@tweenjs/tween.js";
import { Raycaster, Vector2 } from "three";

class Animator {
  constructor(model, scene, camera, renderer) {
    this.model = model;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.duration = 1000;
    this.maxScale = 2;
    this.currentVeiw = -1;

    this.raycaster = new Raycaster();
    this.mouse = new Vector2();

    this.rotationDirection = 1;
    this.zoomedIn = false;

    document.addEventListener("click", this.handleClick.bind(this));
  }

  zoom() {
    this.scaleFactor = this.zoomedIn ? 1 : this.maxScale;
    this.nextScale = {
      x: this.scaleFactor,
      y: this.scaleFactor,
      z: this.scaleFactor,
    };
    new TWEEN.Tween(this.model.scale).to(this.nextScale, this.duration).easing(TWEEN.Easing.Quadratic.Out).start();
    this.zoomedIn = !this.zoomedIn;
  }

  handleClick(event) {
    const canvasBounds = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    this.mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      this.rotate();
    }
  }
  rotate() {
    this.nextRotation = {
      x: this.model.rotation.x,
      y: this.model.rotation.y + this.rotationDirection * Math.PI * 2, // Rotate only on the Y-axis
      z: this.model.rotation.z,
    };

    new TWEEN.Tween(this.model.rotation)
      .to(this.nextRotation, this.duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    this.rotationDirection *= -1;
  }
  standardVeiws() {
    this.camera.position.set(0, 0, 5)
    const front = {
      x: 0,
      y: 0,
      z: 0,
    };
    const top = {
      x: Math.PI / 2,
      y: 0,
      z: 0,
    };
    const side = {
      x: 0,
      y: -Math.PI / 2,
      z: 0,
    };
    const pattern = [side, top, front];
    this.nextVeiw = (this.currentVeiw + 1) % pattern.length;
    new TWEEN.Tween(this.model.rotation)
      .to(pattern[this.nextVeiw], this.duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
    this.currentVeiw = this.nextVeiw;
  }
  update() {
    TWEEN.update();
  }
}

export default Animator;
