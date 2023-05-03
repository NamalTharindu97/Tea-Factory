import "./headCount.scss";
import { PrograssBar } from "../PrograssBar/PrograssBar";
import axios from "axios";
import { useEffect, useState } from "react";

export const HeadCount = () => {
  const [count, setCount] = useState();

  useEffect(() => {
    const getEmployeeCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/tea-factory/employees/count");
        const data = response.data.count;
        setCount(data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmployeeCount();
  }, [count]);

  return (
    <div className="headCount">
      <div className="head-count-probar">
        <p className="count-heading-1">Head Count</p>
        <PrograssBar count={count} />
      </div>
    </div>
  );
};
