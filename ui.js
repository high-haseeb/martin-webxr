function addIcons() {
  const iconContainerRight = document.querySelector(".flex-container-right");
  const iconClassesRight = ["fa fa-cubes fa-2x", "fa fa-panorama fa-2x", "fa fa-gear fa-2x flex-end"];

  iconClassesRight.forEach((iconClass) => {
    const iconElement = document.createElement("i");
    iconElement.className = iconClass;
    iconContainerRight.appendChild(iconElement);
  });

  const iconContainerLeft = document.querySelector(".flex-container-left");
  const iconClassesLeft = ["fa-solid fa-vr-cardboard fa-2x", "fa-solid fa-images fa-2x", "fa-regular fa-heart fa-2x"];

  iconClassesLeft.forEach((iconClass) => {
    const iconElement = document.createElement("i");
    iconElement.className = iconClass;
    iconContainerLeft.appendChild(iconElement);
  });

  const iconContainerCenter = document.querySelector(".flex-container-center");
  const iconClassesCenter = ["fa-regular fa-circle-left fa-4x", "fa-regular fa-circle-right fa-4x"];

  iconClassesCenter.forEach((iconClass) => {
    const iconElement = document.createElement("i");
    iconElement.className = iconClass;
    iconContainerCenter.appendChild(iconElement);
  });
}

// document.addEventListener("DOMContentLoaded", addIcons);


addIcons()

const settingPane = document.querySelector(".setting-container")
const settingBt = document.querySelector(".fa-gear")
settingBt.addEventListener('click', openSetting)
function openSetting() {
  settingPane.classList.remove("hidden")
  settingPane.classList.add('active');
}
document.addEventListener('click', function (event) {
    // Check if the click occurred outside the settings pane
    if (!settingPane.contains(event.target) && !event.target.matches('.fa-gear')) {
      settingPane.classList.remove('active');
      // Add a delay to hide the settings pane after the animation completes
      setTimeout(function () {
        settingPane.classList.add('hidden');
      }, 300); // Match the duration of the CSS transition
    }
  });
let myDiv = document.querySelector(".fa-heart");
myDiv.onclick = function() {
  myDiv.classList.toggle("fa-regular");
  myDiv.classList.toggle("fa-solid");
  myDiv.classList.toggle("bgred");
};
