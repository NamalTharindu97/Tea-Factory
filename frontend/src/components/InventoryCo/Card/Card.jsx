import React from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { UilTimes } from "@iconscout/react-unicons";

const Card = (props) => {
  return <CompactCard param={props} />;
};

function CompactCard({ param }) {
  const Png = param.png;
  return (
    <div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
    >
      <div className="radialBar">
        <CircularProgressbar value={param.barValue} text={`${param.barValue}%`} />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value} {param.unit}</span>
        <span></span>
      </div>
    </div>
  );
}

export default Card;
