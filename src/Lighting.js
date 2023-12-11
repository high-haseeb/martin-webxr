import { DirectionalLight, AmbientLight } from "three";

class LightingSetup {
  constructor(scene) {
    this.scene = scene;
    this.setupLighting();
  }

  setupLighting() {
    // Directional light
    const directionalLight = new DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Ambient light
    const ambientLight = new AmbientLight();
    this.scene.add(ambientLight);
  }
}

export default LightingSetup;
