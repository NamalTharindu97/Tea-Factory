import "./headCount.scss";
import { PrograssBar } from "../PrograssBar/PrograssBar";

export const HeadCount = () => {
  return (
    <div className="headCount">
      <div className="head-count-probar">
        <p className="count-heading-1">Head Count</p>
        <PrograssBar />
      </div>
    </div>
  );
};
