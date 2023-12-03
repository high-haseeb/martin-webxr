import Link from "next/link";
import {
  faBars,
  faCamera,
  faGlobe,
  faVrCardboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";

function RightPane() {
  return (
    <div className="fixed top-0 right-0 w-1/12 h-screen border-l-2 hidden md:block lg:block">
      <div className="flex flex-col h-full py-8 space-y-8 items-center ">
        <ButtonUI name={faBars} />
        <ButtonUI name={faVrCardboard} />
        <ButtonUI name={faCamera} />
        <ButtonUI name={faGlobe} />
      </div>
    </div>
  );
}
export const ButtonUI = ({ name }) => {
  const [isHovered, setHover] = useState(false);
  const handleHover = () => {
    setHover(true);
  };
  const handleHoverOut = () => {
    setHover(false);
  };
  const springs = useSpring({
    backgroundColor: isHovered ? "black" : "white",
  });

  return (
    <Link href={`/pages`}>
      <animated.div
        style={{ ...springs }}
        className="flex w-16 h-16 rounded-full items-center justify-center"
      >
        <FontAwesomeIcon
          className={`${isHovered ? "text-white" : "text-black"} fa-2x`}
          icon={name}
          onMouseOver={handleHover}
          onMouseLeave={handleHoverOut}
        />
      </animated.div>
    </Link>
  );
};

export default RightPane;
