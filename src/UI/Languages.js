class LanguageMenu {
  constructor(container) {
    this.menu = document.createElement("div");
    this.menu.classList.add("languages");
    container.appendChild(this.menu);
    this.languages = [
      "English",
      "Mandarin Chinese",
      "Spanish",
      "Hindi",
      "Arabic",
      "Bengali",
      "Portuguese",
      "Russian",
      "Urdu",
      "Indonesian",
    ];
    this.languages.forEach((language) => {
      let languageContainer = document.createElement("div");
      languageContainer.innerText = language;
      this.menu.appendChild(languageContainer);
      languageContainer.addEventListener("click", () => {
        console.log("language changed to ", language);
      });
    });
  }
  loadMenu(event) {
    const language_button = document.getElementById("globecontainer");
    this.menu.classList.remove("hidden");
    this.menu.classList.add("show");
    this.menu.style.left = `${event.clientX - this.menu.offsetWidth / 2}px`;
    document.addEventListener("click", (event) => {
      const clickedElement = event.target;
      if (!this.menu.contains(clickedElement) && !language_button.contains(clickedElement)) {
        this.menu.classList.add("hidden");
      }
    });
  }
}
export default LanguageMenu;
