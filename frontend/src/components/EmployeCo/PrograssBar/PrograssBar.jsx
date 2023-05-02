import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./prograssBar.scss";

// Animation
import { easeBounceInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

const count = 12;

export const PrograssBar = () => {
  return (
    <div className="PrograssBar">
      <AnimatedProgressProvider valueStart={0} valueEnd={count} duration={5} easingFunction={easeBounceInOut} repeat>
        {(value) => (
          <CircularProgressbar
            value={value}
            maxValue={20}
            text={`${Math.round(value)}`}
            styles={{
              path: {
                // Path color
                stroke: "#00e676",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "round",
                // Customize transition animation
                transition: "stroke-dashoffset 5.0s ease 0s",
              },
              // Customize the "total progress"
              trail: {
                // Trail color
                stroke: "#898b9a",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Rotate the trail
              },
            }}
          />
        )}
      </AnimatedProgressProvider>
    </div>
  );
};
