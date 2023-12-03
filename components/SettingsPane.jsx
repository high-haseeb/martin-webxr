import { faCube, faGear, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonUI } from "./RightPane";
import React from "react";

function SettingsPane() {
  return (
    <div className="fixed top-0 left-0 w-1/12 h-screen border-r-2">
      <div className="flex flex-col h-full py-8 space-y-8 items-center">
        <ButtonUI name={faImages}/>
        <ButtonUI name={faCube}/>
        <div className="flex flex-col justify-end h-full ">
          <ButtonUI name={faGear}/>
        </div>
      </div>
    </div>
  );
}

export default SettingsPane;
