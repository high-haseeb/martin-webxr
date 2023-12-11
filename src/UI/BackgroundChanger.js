import { Color, CubeTextureLoader } from "three";

class BackgroundChanger {
  constructor(scene) {
    this.currBgCount = 0;
    this.scene = scene;
    this.bgArr = ["space", "mountain", "#ff9f8f", "#fb4f90", "#ffffff"];
    this.format = ".png";
  }

  changeBackground() {
    const urls = [
      `${this.bgArr[this.currBgCount]}/px${this.format}`,
      `${this.bgArr[this.currBgCount]}/nx${this.format}`,
      `${this.bgArr[this.currBgCount]}/py${this.format}`,
      `${this.bgArr[this.currBgCount]}/ny${this.format}`,
      `${this.bgArr[this.currBgCount]}/pz${this.format}`,
      `${this.bgArr[this.currBgCount]}/nz${this.format}`,
    ];

    if (this.bgArr[this.currBgCount][0] != "#") {
      new CubeTextureLoader().load(
        urls,
        (newBg) => {
          this.scene.background = newBg;
        },
        (err) => {
          console.error(err);
        },
      );
    } else {
      this.scene.background = new Color(this.bgArr[this.currBgCount]);
    }

    if (this.currBgCount == this.bgArr.length - 1) {
      this.currBgCount = 0;
    } else {
      this.currBgCount += 1;
    }
  }
}
export default BackgroundChanger;
