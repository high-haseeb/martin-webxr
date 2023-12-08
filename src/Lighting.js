import { DirectionalLight, AmbientLight } from "three";

class LightingSetup {
  constructor(scene) {
    this.scene = scene;
    this.setupLighting();
  }

  setupLighting() {
    // Directional light
    const directionalLight = new DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight);

    // Ambient light
    const ambientLight = new AmbientLight();
    this.scene.add(ambientLight);
  }
}

export default LightingSetup;
