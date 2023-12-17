import Icon from "./FontAwesomeIcons";
class Bar {
  constructor(div, position, barIcons, toolTip) {
    this.container = div;
    this.bar = document.createElement("div");
    this.bar.classList.add(position);
    this.bar.classList.add("Bar");
    this.updateElementSizeClass();
    this.bar.classList.add(this.size);
    this.container.appendChild(this.bar);
    this.tooltip = toolTip;
    this.barSetup(barIcons);
    // console.log(this.bar)
  }
  updateElementSizeClass() {

    if (this.container.offsetWidth < 200) {
      this.size = "small";
    } else if (this.container.offsetWidth < 450) {
      this.size = "medium";
    } else {
      this.size = "large";
    }
  }
  addHideBar() {
    const bars = new Icon("bars");
    bars.classList.add(this.size)
    this.container.appendChild(bars);
    // console.log(bars)
    this.bar.classList.add("moveup");
    bars.addEventListener("click", () => {
      this.bar.classList.toggle("moveup");
      this.bar.classList.toggle("movedown");
    });
  }
  barSetup(barIcons) {
    barIcons.forEach((icon) => {
      const iconElement = new Icon(icon.name);
      this.bar.appendChild(iconElement);

      iconElement.addEventListener("mouseenter", (event) => {
        this.tooltip.toolTipShow(event, icon.tooltip);
      });
      iconElement.addEventListener("mouseleave", () => {
        this.tooltip.toolTipHide();
      });
      iconElement.addEventListener("click", (event) => {
        icon.callback(event);
      });
    });
  }
}
export default Bar;
