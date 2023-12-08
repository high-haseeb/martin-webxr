import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ARButton } from "./ARbutton";
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader";
import * as TWEEN from "@tweenjs/tween.js";


let controller, reticle;
let hitTestSource = null;
let hitTestSourceRequested = false;
let curr_bg_count = 0;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.xr.enabled = true;
document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] }));

// lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);
const light = new THREE.AmbientLight();
scene.add(light);

camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onSelect() {
  console.log("you clicked me");
}
controller = renderer.xr.getController(0);
controller.addEventListener("select", onSelect);
scene.add(controller);

// reticle = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "#ff00ff" }));
// scene.add(reticle);

let model_loaded = false;
const loader = new USDZLoader().setPath("/usdz/");
loader.loadAsync("saeukkang.usdz").then((model) => {
  model.position.y = 0.25;
  model.position.z = -0.25;
  reticle = model;
  scene.add(reticle);
});
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener("click", onMouseClick);
function onMouseClick(event) {
  const canvasBounds = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
  mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    model_animation();
  }
}
let rotationDirection = 1;
function model_animation() {
  console.log("animation started");

  const nextRotation = {
    x: reticle.rotation.x + rotationDirection * Math.PI,
    y: reticle.rotation.y + rotationDirection * Math.PI,
    z: reticle.rotation.z + rotationDirection * Math.PI,
  };
  const tween = new TWEEN.Tween(reticle.rotation)
    .to(nextRotation, 2000) // Ending rotation and duration in milliseconds
    .easing(TWEEN.Easing.Quadratic.Out) // Optional easing function
    .start(); // Start the animation
  rotationDirection *= -1;
}
const changeBt = document.querySelector(".fa-panorama");
const resetBg = document.querySelector(".fa-images");
changeBt.addEventListener("click", changeBg);
resetBg.addEventListener("click", () => {
  scene.background = new THREE.Color(0xffffff);
});

function changeBg() {
  const bg_arr = ["space", "mountain", "#0f0f0f", "#fb4f90"];
  const format = ".png";
  const urls = [
    bg_arr[curr_bg_count] + "/px" + format,
    bg_arr[curr_bg_count] + "/nx" + format,
    bg_arr[curr_bg_count] + "/py" + format,
    bg_arr[curr_bg_count] + "/ny" + format,
    bg_arr[curr_bg_count] + "/pz" + format,
    bg_arr[curr_bg_count] + "/nz" + format,
  ];
  if (bg_arr[curr_bg_count][0] != "#") {
    new THREE.CubeTextureLoader().load(
      urls,
      (new_bg) => {
        scene.background = new_bg;
      },
      (err) => {
        console.log(err);
      },
    );
  } else {
    scene.background = new THREE.Color(bg_arr[curr_bg_count]);
  }
  if (curr_bg_count == bg_arr.length - 1) {
    curr_bg_count = 0;
  } else {
    curr_bg_count += 1;
  }
}

function animate() {
  renderer.setAnimationLoop(render);
}

renderer.xr.addEventListener("sessionstart", () => {
  console.log("session started");
  reticle.matrixAutoUpdate = false;
});

renderer.xr.addEventListener("sessionend", () => {
  console.log("session ended");
  reticle.visible = true;
  reticle.matrixAutoUpdate = true;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 5;
});

function render(timestamp, frame) {
  if (frame) {
    reticle.matrixAutoUpdate = false;
    const referenceSpace = renderer.xr.getReferenceSpace();
    const session = renderer.xr.getSession();
    if (hitTestSourceRequested === false) {
      session.requestReferenceSpace("viewer").then(function(referenceSpace) {
        session.requestHitTestSource({ space: referenceSpace }).then(function(source) {
          hitTestSource = source;
        });
      });
      session.addEventListener("end", function() {
        hitTestSourceRequested = false;
        hitTestSource = null;
      });
      hitTestSourceRequested = true;
    }
    if (hitTestSource) {
      const hitTestResults = frame.getHitTestResults(hitTestSource);
      if (hitTestResults.length) {
        const hit = hitTestResults[0];
        reticle.visible = true;
        reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
      } else {
        reticle.visible = false;
      }
    }
  }
  TWEEN.update();
  controls.update();
  renderer.render(scene, camera);
}
animate();
