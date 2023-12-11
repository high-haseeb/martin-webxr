class Icon {
  constructor(name, callback) {
    this.name = name;
    this.iconContainer = document.createElement("div")
    this.icon = document.createElement("i");
    this.iconContainer.appendChild(this.icon)
    this.iconContainer.classList.add("name", "icon-container")
    this.icon.classList.add(`fa-solid`,`fa-${this.name}`, "icon");
    this.icon.id = this.name;
    this.iconContainer.id = this.name + 'container'
    return this.iconContainer;
  }
}
export default Icon;
