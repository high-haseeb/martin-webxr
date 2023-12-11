import Icon from "./FontAwesomeIcons";
class Bar {
  constructor(div, position, barIcons, toolTip) {
    this.div = div;
    this.bar = document.createElement("div");
    this.bar.classList.add(position);
    this.bar.classList.add("Bar");
    this.div.appendChild(this.bar);
    this.tooltip = toolTip;
    this.barSetup(barIcons);
  }
  addHideBar() {
    const bars = new Icon("bars");
    this.bar.classList.add("moveup");
    this.div.appendChild(bars);
    bars.addEventListener("click", () => {
      this.bar.classList.toggle("moveup");
      this.bar.classList.toggle("movedown");
    });
  }
  barSetup(barIcons) {
    barIcons.forEach(icon => {
      
      const iconElement = new Icon(icon.name);
      this.bar.appendChild(iconElement);

      iconElement.addEventListener("mouseenter", (event) => {
        this.tooltip.toolTipShow(event, icon.tooltip);
      });
      iconElement.addEventListener("mouseleave", () => {
        this.tooltip.toolTipHide();
      });
      iconElement.addEventListener("click", (event)=> {
        icon.callback(event);
      })
    });
  }
}
export default Bar;
