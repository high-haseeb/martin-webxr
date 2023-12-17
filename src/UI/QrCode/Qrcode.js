import QRCode from "qrcode";
import "./QrCode.css";

export function QrCode(container, buttonId) {
  if (document.getElementById("qrcodeContainer") == null) {
    const codeContainer = document.createElement("div");
    codeContainer.id = "qrcodeContainer";
    codeContainer.innerText = "Scan to Open in AR";
    codeContainer.style.display = "none";

    const code = document.createElement("canvas");
    code.id = "qrcode";

    const button = document.getElementById(buttonId);

    const link = window.location.href;
    QRCode.toCanvas(code, link, function (error) {
      if (error) {
        console.error(error);
      } else {
        codeContainer.appendChild(code);
        container.appendChild(codeContainer);
      }
    });
    hideQrCode(container, codeContainer, button);
  }
}
function hideQrCode(container, codeContainer, button) {
  document.addEventListener("click", function (event) {
    const isClickInsideContainer = container.contains(event.target);
    const isClickOnButton = button.contains(event.target);

    if (isClickInsideContainer && !isClickOnButton && isElementVisible(codeContainer)) {
      codeContainer.style.display = "none";
    }
    if (isClickOnButton & !isElementVisible(codeContainer)) {
      codeContainer.style.display = "flex";
    } else if (isClickOnButton & isElementVisible(codeContainer)) {
      codeContainer.style.display = "none";
    }
  });
}
function isElementVisible(element) {
  if (element.style.display === "none") {
    return false;
  }
  return true;
}
