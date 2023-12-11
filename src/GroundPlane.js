import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide } from "three";
class GroundPlane {
  constructor() {
    const groundGeometry = new PlaneGeometry(100, 100);
    const groundMaterial = new MeshBasicMaterial({ color: 0xfffff4, side: DoubleSide });
    const groundPlane = new Mesh(groundGeometry, groundMaterial);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.receiveShadow = true;
    return groundPlane;
  }
}
export default GroundPlane;
