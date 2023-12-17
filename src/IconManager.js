import "./UI/style.css";
import Bar from "./UI/BottomBar";
import ToolTip from "./UI/ToolTip";
import BackgroundChanger from "./UI/BackgroundChanger";
import LanguageMenu from "./UI/Languages";
import { QrCode } from "./UI/QrCode/Qrcode";

class IconManager {
  constructor(targetDiv, animator, scene) {
    this.container = targetDiv;

    this.animator = animator;
    this.scene = scene;

    this.backgroundChanger = new BackgroundChanger(this.scene);
    this.languageChanger = new LanguageMenu(this.container);
    if (!this.container) {
      console.error(`element with id: ${targetDiv} not found.`);
    }
    this.container.classList.add("parent");

    this.topIcons = [
      { name: "circle", tooltip: "online status", callback: this.test },
      { name: "message", tooltip: "comment", callback: this.test },
      { name: "video", tooltip: "stream", callback: this.test },
    ];

    this.bottomIcons = [
      { name: "cube", tooltip: "standard veiws", callback: () => this.animator.standardVeiws() },
      { name: "rotate", tooltip: "rotate", callback: () => this.animator.rotate() },
      { name: "up-right-and-down-left-from-center", tooltip: "zoom", callback: () => this.animator.zoom() },
      { name: "unity", tooltip: "Open AR", callback: () => this.checkXR() },
      // {
      //   name: "eye",
      //   tooltip: "change background",
      //   callback: () => this.backgroundChanger.changeBackground()
      // },
      { name: "vr-cardboard", tooltip: "enter VR", callback: this.test },
      { name: "save", tooltip: "save_backend", callback: this.test },
      // { name: "gear", tooltip: "settings", callback: this.test },
      // { name: "globe", tooltip: "change language", callback: (event) => this.languageChanger.loadMenu(event) },
      { name: "share", tooltip: "share", callback: () => this.share() },
      { name: "expand", tooltip: "fullscreen", callback: () => this.fullscreen() },
    ];
  }
  checkXR() {
    if ("xr" in navigator) {
      navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
        if (supported) {
          console.log("AR is supported on this device!");
        } else {
          QrCode(this.container, "unity");
          console.log("AR is not supported on this device.");
        }
      });
    } else {
      console.log("WebXR not supported in this browser.");
    }
  }
  loadBars() {
    new Bar(this.container, "BottomBar", this.bottomIcons, new ToolTip(this.container, "bottom")).addHideBar();
    new Bar(this.container, "TopBar", this.topIcons, new ToolTip(this.container, "top"));
  }
  setCallbackByNameTop(name, callback) {
    const icon = this.topIcons.find((icon) => icon.name === name);

    if (icon) {
      icon.callback = () => callback();
    } else {
      console.error(`Icon with name "${name}" not found.`);
    }
  }

  setCallbackByNameBottom(name, callback) {
    const icon = this.bottomIcons.find((icon) => icon.name === name);

    if (icon) {
      icon.callback = callback;
    } else {
      console.error(`Icon with name "${name}" not found.`);
    }
  }

  test() {
    console.log("callbacks are working");
  }
  fullscreen() {
    this.toggleFullscreen(this.container);
  }

  share() {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that do not support Web Share API
      alert("Web Share API is not supported on this browser.");
    }
  }

  toggleFullscreen(targetDiv) {
    const fullscreenDiv = targetDiv;

    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      // If already in fullscreen, exit fullscreen
      this.exitFullscreen();
    } else {
      // If not in fullscreen, enter fullscreen
      this.requestFullscreen(fullscreenDiv);
    }
  }

  requestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
export default IconManager;
