import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ARButton } from "./helpers/ARButton";
import Animator from "./Animator";
import LightingSetup from "./Lighting";
import IconManager from "./IconManager";
import ModelLoader from "./loaders/ModelLoader";
import { VRButton } from "./VRButton";
import "../style.css";

export class ARScene {
  constructor(
    containerId,
    modelPath,
    cameraCallback = () => {
      console.log("please add camera api");
    },
    onlineCallback = () => {
      console.log("please add online api");
    },
    commentCallback = () => {
      console.log("please add comment api");
    },
    saveCallback = () => {
      console.log("please add save api");
    },

    streamCallback = () => {
      console.log("please add save api");
    },
  ) {
    this.container = document.getElementById(containerId);
    if (this.container.tagName.toLowerCase() !== "div") {
      console.log("not an div");
    }
    this.cameraCallback = cameraCallback;
    this.onlineCallback = onlineCallback;
    this.commentCallback = commentCallback;
    this.saveCallback = saveCallback;
    this.streamCallback = streamCallback;

    this.setup();
    this.loadModel(modelPath);
    this.setupEventListeners();
  }

  setup() {
    var polyfill = new WebXRPolyfill();
    this.setupScene();
    this.setupRenderer();
    this.setupCamera();
    this.setupControls();
    this.isPaused = false;
    new LightingSetup(this.scene);
    this.reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial(),
    );
    this.reticle.matrixAutoUpdate = false;
    this.reticle.visible = false;
    this.scene.add(this.reticle);
  }
  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfffffb);
  }
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;
  }
  setupRenderer() {
    const canvas = document.createElement("canvas");
    canvas.id = "bg";
    this.container.appendChild(canvas);
    // this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true, alpha: true });
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
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
      this.setupUI();
    });
  }
  onSelect() {
    if (this.reticle.visible) {
      this.reticle.matrix.decompose(this.model.position, this.model.quaternion, this.model.scale);
      this.scene.add(this.model);
    }
  }

  setupUI() {
    this.iconManager = new IconManager(this.container, this.animator, this.scene);

    // this.iconManager.setCallbackByNameBottom("camera", this.cameraCallback);
    this.iconManager.setCallbackByNameTop("circle", this.onlineCallback);
    this.iconManager.setCallbackByNameTop("video", this.streamCallback);
    this.iconManager.setCallbackByNameTop("message", this.commentCallback);
    // this.iconManager.setCallbackByNameBottom("save", this.saveCallback);
    this.iconManager.loadBars();

    const vrButton = document.getElementById("vr-cardboardcontainer");
    const arButton = document.getElementById("unity");
    arButton.classList.add("fa-brands");
    ARButton.createButton(arButton, this.renderer, { requiredFeatures: ["hit-test"] });
    VRButton.createButton(this.renderer, vrButton);
  }
  // setCameraCallback(callback) { }

  setupEventListeners() {
    this.controller.addEventListener("select", () => {
      this.onSelect();
      this.isPaused = true;
      console.log("pressed");
    });

    window.addEventListener("resize", () => {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.camera.updateProjectionMatrix();
    });

    this.renderer.xr.addEventListener("sessionstart", () => {
      this.scene.remove(this.model);
      console.log("session started");
      this.scene.background = null;
    });

    this.renderer.xr.addEventListener("sessionend", () => {
      console.log("session ended");
      this.model.visible = true;
      this.model.matrixAutoUpdate = true;
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
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
          this.reticle.visible = true;
          if (!this.isPaused) {
            this.reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
          }
        } else {
          this.reticle.visible = false;
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
