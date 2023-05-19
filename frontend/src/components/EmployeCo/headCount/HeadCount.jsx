import "./headCount.scss";
import { PrograssBar } from "../PrograssBar/PrograssBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scaleVariant } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

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
    <motion.div className="headCount" variants={scaleVariant} initial="initial" animate="animate">
      <div className="head-count-probar">
        <p className="count-heading-1">Head Count</p>
        <PrograssBar count={count} />
      </div>
    </motion.div>
  );
};
