import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ARButton } from "./helpers/ARButton";
import Animator from "./Animator";
import LightingSetup from "./Lighting";
import IconManager from "./IconManager";
import ModelLoader from "./loaders/ModelLoader";
import { VRButton } from "./VRButton";

class ARScene {
  constructor(modelPath) {
    this.setup();
    this.loadModel(modelPath);
    this.setupEventListeners();
  }

  setup() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    new LightingSetup(this.scene);
  }
  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfffffb);
  }
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
  }
  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.xr.enabled = true;
    this.hitTestSource = null;
    this.hitTestSourceRequested = false;
  }
  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // AR controls
    this.controller = this.renderer.xr.getController(0);
    this.scene.add(this.controller);
  }
  setupAnimator() {
    this.animator = new Animator(this.model, this.scene, this.camera, this.renderer);
  }
  loadModel(modelPath) {
    this.isModelLoaded = false;
    this.modelLoader = new ModelLoader(modelPath);
    this.modelLoader.loadModel((model) => {
      this.model = new THREE.Group();
      this.model.add(model);
      this.scene.add(this.model);
      this.isModelLoaded = true;
      this.setupAnimator();
      this.iconManager = new IconManager("ARVeiwerContainer", this.animator, this.scene);
      document.body.appendChild(ARButton.createButton(this.renderer, { requiredFeatures: ["hit-test"] }));
      const vrButton = document.getElementById("vr-cardboardcontainer");
      VRButton.createButton(this.renderer, vrButton);
    });
  }

  setupEventListeners() {
    this.controller.addEventListener("select", () => {
      console.log("ar_event_click");
    });

    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.renderer.xr.addEventListener("sessionstart", () => {
      console.log("session started");
      this.scene.background = null;
      this.model.matrixAutoUpdate = false;
      this.model.visible = false;
    });

    this.renderer.xr.addEventListener("sessionend", () => {
      console.log("session ended");
      this.model.visible = true;
      this.model.matrixAutoUpdate = true;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.position.z = 5;
    });
  }

  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this));
  }
  render(timestamp, frame) {
    if (frame) {
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
      this.controls.update();
      this.animator.update();
    }
    this.renderer.render(this.scene, this.camera);
  }
}

// const arScene = new ARScene("./usdz/saeukkang.usdz");
const arScene = new ARScene("./Mixer.glb");
arScene.animate();
