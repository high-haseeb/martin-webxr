import "./UI/style.css";
import Bar from "./UI/BottomBar";
import ToolTip from "./UI/ToolTip";
import BackgroundChanger from "./UI/BackgroundChanger";
import LanguageMenu from "./UI/Languages";

class IconManager {
  constructor(targetDiv, animator, scene) {
    this.targetDiv = document.getElementById(targetDiv);

    this.animator = animator;
    this.scene = scene;


    this.backgroundChanger = new BackgroundChanger(this.scene);
    this.languageChanger = new LanguageMenu(this.targetDiv);
    if (!this.targetDiv) {
      console.error(`element with id: ${targetDiv} not found.`);
    }
    this.targetDiv.classList.add("parent");

    this.topIcons = [
      { name: "circle", tooltip: "online status", callback: this.test },
      { name: "message", tooltip: "comment", callback: this.test },
      { name: "video", tooltip: "stream", callback: this.test },
    ];

    this.bottomIcons = [
      { name: "cube", tooltip: "standard veiws", callback: () => this.animator.standardVeiws() },
      { name: "rotate", tooltip: "rotate", callback: () => this.animator.rotate() },
      { name: "up-right-and-down-left-from-center", tooltip: "zoom", callback: () => this.animator.zoom() },
      { name: "camera", tooltip: "camera_backend", callback: this.test },
      {
        name: "eye",
        tooltip: "change background",
        callback: () => this.backgroundChanger.changeBackground()
      },
      { name: "vr-cardboard", tooltip: "enter VR", callback: this.test },
      { name: "save", tooltip: "save_backend", callback: this.test },
      { name: "gear", tooltip: "settings", callback: this.test },
      { name: "globe", tooltip: "change language", callback: (event) => this.languageChanger.loadMenu(event)},
      { name: "share", tooltip: "share", callback: () => this.share() },
      { name: "expand", tooltip: "fullscreen", callback: () => this.fullscreen() },
    ];

    new Bar(this.targetDiv, "BottomBar", this.bottomIcons, new ToolTip("bottom")).addHideBar();
    new Bar(this.targetDiv, "TopBar", this.topIcons, new ToolTip("top"));
  }

  test() {
    console.log("callbacks are working");
  }
  fullscreen() {
    this.toggleFullscreen(this.targetDiv);
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
