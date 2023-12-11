import { USDZLoader } from "./USDZLoader";
import { GLTFLoader } from "./GLTFLoader";
import { Box3, Vector3 } from "three";

class ModelLoader {
  constructor(modelUrl) {
    this.modelUrl = modelUrl;
    this.fileExtension = this.modelUrl.split(".").pop().toLowerCase();
  }

  loadModel(callback) {
    this.model = null;

    // loading the model
    console.log(this.fileExtension);
    if (this.fileExtension == "usdz") {
      this.loader = new USDZLoader();
    } else if (this.fileExtension == "glb") {
      this.loader = new GLTFLoader();
    } else {
      console.error("Only glb/gltf and usdz/usda models are supported");
    }

    this.loader
      .loadAsync(this.modelUrl)
      .then((model) => {
        if (this.fileExtension == "usdz") {
          this.model = model;
        } else if (this.fileExtension == "glb") {
          this.model = model.scene;
        }

        // scaling the model correctly
        let bbox = new Box3().setFromObject(this.model);
        const modelSize = new Vector3();
        bbox.getSize(modelSize);
        const desiredSize = 3; // Adjust this based on your preference
        const scale = desiredSize / Math.max(modelSize.x, modelSize.y, modelSize.z);
        this.model.scale.set(scale, scale, scale);

        // positionint the model in the center
        bbox = new Box3().setFromObject(this.model);
        const center = new Vector3();
        bbox.getCenter(center);
        this.model.position.sub(center);

        callback(this.model);
      })
      .catch((err) => console.error(err));
  }
}
export default ModelLoader;
