import React from "react";
import "./AnalyticsCards.css";
import { CardsData } from "../../../asserts/InventoryAs/Data/Data";
import AnalyticsCard from "../AnalyticsCard/AnalyticsCard";

const AnalyticsCards = () => {
  return (
    <div className="AnalyticsCards">
      {CardsData.map((card, id) => {
        return (
          <div className="parentContainer">
            <AnalyticsCard title={card.title} color={card.color} barValue={card.barValue} value={card.value} png={card.png} series={card.series} />
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsCards;
