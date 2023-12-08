import * as TWEEN from "@tweenjs/tween.js";

import { Raycaster, Vector2 } from "three";

class Animator {
  constructor(model, scene, camera, renderer) {
    this.model = model;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.raycaster = new Raycaster();
    this.mouse = new Vector2();

    this.rotationDirection = 1;

    document.addEventListener("click", this.handleClick.bind(this));
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
      x: this.model.rotation.x + this.rotationDirection * Math.PI,
      y: this.model.rotation.y + this.rotationDirection * Math.PI,
      z: this.model.rotation.z + this.rotationDirection * Math.PI,
    };
    new TWEEN.Tween(this.model.rotation).to(this.nextRotation, 2000).easing(TWEEN.Easing.Quadratic.Out).start();
    this.rotationDirection *= -1;
  }
  update() {
    TWEEN.update();
  }
}

export default Animator;
