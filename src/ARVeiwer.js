import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ARButton } from "./helpers/ARButton";
import { USDZLoader } from "./loaders/USDZLoader";
import Animator from "./Animator";
import LightingSetup from "./Lighting";
import BackgroundChanger from "./BackgroundChanger";
import IconManager from "./IconManager";

import { GLTFLoader } from "./loaders/GLTFLoader";

class ARScene {
  constructor(modelPath) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.xr.enabled = true;

    new LightingSetup(this.scene);
    new IconManager();
    this.backgroundChanger = new BackgroundChanger(this.scene);

    document.body.appendChild(ARButton.createButton(this.renderer, { requiredFeatures: ["hit-test"] }));

    this.isModelLoaded = false;

    this.hitTestSource = null;
    this.hitTestSourceRequested = false;

    this.setupCamera();
    this.setupControls();
    this.loadModel(modelPath);
    this.setupEventListeners();
  }

  setupCamera() {
    this.camera.position.z = 5;
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  loadModel(modelPath) {
    this.model = null;
    const loader = new USDZLoader();
    loader.loadAsync(modelPath).then((model) => {
      model.position.y = 0.25;
      model.position.z = -0.25;
      this.model = model;
      this.scene.add(this.model);
      this.animator = new Animator(this.model, this.scene, this.camera, this.renderer);
      this.isModelLoaded = true;
    });
  }

  setupEventListeners() {

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.renderer.xr.addEventListener("sessionstart", () => {
      console.log("session started");
      this.model.matrixAutoUpdate = false;
    });

    this.renderer.xr.addEventListener("sessionend", () => {
      console.log("session ended");
      this.model.visible = true;
      this.model.matrixAutoUpdate = true;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.camera.position.z = 5;
    });
  }

  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this));
  }
  render(timestamp, frame) {
    if (frame) {
      this.model.matrixAutoUpdate = false;
      const referenceSpace = this.renderer.xr.getReferenceSpace();
      const session = this.renderer.xr.getSession();
      if (this.hitTestSourceRequested === false) {
        session.requestReferenceSpace("viewer").then((referenceSpace) => {
          session.requestHitTestSource({ space: referenceSpace }).then((source) => {
            this.hitTestSource = source;
          });
        });
        session.addEventListener("end", () => {
          this.hitTestSourceRequested = false;
          this.hitTestSource = null;
        });
        this.hitTestSourceRequested = true;
      }
      if (this.hitTestSource) {
        const hitTestResults = frame.getHitTestResults(this.hitTestSource);
        if (hitTestResults.length) {
          const hit = hitTestResults[0];
          this.model.visible = true;
          this.model.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
        } else {
          this.model.visible = false;
        }
      }
    }
    if (this.isModelLoaded) {
      this.animator.update();
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }
}

const arScene = new ARScene("./usdz/saeukkang.usdz");
arScene.animate();
