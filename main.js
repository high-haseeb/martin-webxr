import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ARButton } from "./ARbutton";

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

// controller = renderer.xr.getController(0);
// controller.addEventListener('select', onSelect);
// scene.add(controller);

reticle = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "#ff00ff" }));
scene.add(reticle);

const changeBt = document.querySelector(".fa-panorama");
changeBt.addEventListener("click", changeBg);
function changeBg() {
  const pre_addr = "./public/";
  const bg_arr = ["space", "mountain", "#0f0f0f", "#fb4f90"];
  const format = ".png";
  const urls = [
    pre_addr + bg_arr[curr_bg_count] + "/px" + format,
    pre_addr + bg_arr[curr_bg_count] + "/nx" + format,
    pre_addr + bg_arr[curr_bg_count] + "/py" + format,
    pre_addr + bg_arr[curr_bg_count] + "/ny" + format,
    pre_addr + bg_arr[curr_bg_count] + "/pz" + format,
    pre_addr + bg_arr[curr_bg_count] + "/nz" + format,
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
  controls.update();
  renderer.render(scene, camera);
}
animate();
