import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
scene.add(cube);

// Set up camera position
camera.position.z = 5;

// Create a tween for the cube's rotation
const rotationTween = new TWEEN.Tween(cube.rotation)
  .to({ x: Math.PI * 2, y: Math.PI * 2, z: Math.PI * 2 }, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .repeat(Infinity) // Repeat the animation indefinitely
  .start();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Your rendering loop
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update(); // Update Tween.js animations
  renderer.render(scene, camera);
}

animate();
