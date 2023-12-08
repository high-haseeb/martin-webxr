class IconManager {
  constructor() {
    this.iconContainerRight = document.querySelector(".flex-container-right");
    this.iconContainerLeft = document.querySelector(".flex-container-left");

    this.iconClassesRight = ["fa fa-cube fa-2x", "fa fa-panorama fa-2x ", "fa-regular fa-images fa-2x"];
    this.iconClassesLeft = ["fa-solid fa-vr-cardboard fa-2x", "fa-solid fa-globe fa-2x", "fa-regular fa-heart fa-2x"];

    this.addIcons();
    this.setupEventListeners();
  }

  addIcons() {
    this.addIconsToContainer(this.iconContainerRight, this.iconClassesRight);
    this.addIconsToContainer(this.iconContainerLeft, this.iconClassesLeft);
  }

  addIconsToContainer(container, iconClasses) {
    iconClasses.forEach((iconClass) => {
      const iconElement = document.createElement("i");
      iconElement.className = iconClass;
      container.appendChild(iconElement);
    });
  }

  setupEventListeners() {
    const settingPane = document.querySelector(".setting-container");
    const settingBt = document.querySelector(".fa-gear");

    settingBt.addEventListener('click', () => this.openSetting(settingPane));
    
    document.addEventListener('click', (event) => {
      this.handleDocumentClick(event, settingPane);
    });

    const myDiv = document.querySelector(".fa-heart");
    myDiv.addEventListener('click', () => this.toggleHeartIcon(myDiv));
  }

  openSetting(settingPane) {
    settingPane.classList.remove("hidden");
    settingPane.classList.add('active');
  }

  handleDocumentClick(event, settingPane) {
    if (!settingPane.contains(event.target) && !event.target.matches('.fa-gear')) {
      settingPane.classList.remove('active');
      setTimeout(() => {
        settingPane.classList.add('hidden');
      }, 300);
    }
  }

  toggleHeartIcon(myDiv) {
    myDiv.classList.toggle("fa-regular");
    myDiv.classList.toggle("fa-solid");
    myDiv.classList.toggle("bgred");
  }
}

export default IconManager;
