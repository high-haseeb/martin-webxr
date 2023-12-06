import * as THREE from 'three'

const path = "./public/";
const bgs = ["mountains"]
const format = ".png";
const urls = [
  path + "px" + format,
  path + "nx" + format,
  path + "py" + format,
  path + "ny" + format,
  path + "pz" + format,
  path + "nz" + format,
];
const reflectionCube = new THREE.CubeTextureLoader().load(urls);
