class ToolTip {
  constructor(container, position) {
    this.position = position
    this.container = container;
    this.toolTipSetup();

  }

  toolTipShow(event, tooltipText) {
    this.tooltipTimeout = setTimeout(() => {
      this.tooltip.style.display = "block";
      this.tooltip.innerText = tooltipText;
      this.tooltip.style.left = `${event.clientX - this.tooltip.offsetWidth / 2}px`;
    }, 500);
  }

  toolTipHide() {
    clearTimeout(this.tooltipTimeout);
    this.tooltip.style.display = "none";
  }

  toolTipSetup() {
    this.tooltip = document.createElement("div");
    this.tooltip.classList.add("tooltip");
    this.tooltip.classList.add(`${this.position}-tooltip`);
    this.container.appendChild(this.tooltip);
  }
}
export default ToolTip;
