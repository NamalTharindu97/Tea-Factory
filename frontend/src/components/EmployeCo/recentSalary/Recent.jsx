import { useState } from "react";
import "./recent.scss";
import { motion } from "framer-motion";
import axios from "axios";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";
import { scaleVariant } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const Recent = () => {
  const [recentPayroll, setPayrolles] = useState([]);

  useState(() => {
    const getRecentPayments = async () => {
      const payrolls = await axios.get("/payrolls/count/Lastest/Payroll");
      setPayrolles(payrolls.data);
    };
    getRecentPayments();
  }, []);

  return (
    <motion.div className="recent" variants={scaleVariant} initial="initial" animate="animate">
      <p className="recent-heading">Latest Employee Payments</p>
      {recentPayroll.length > 0 ? (
        <div>
          {recentPayroll.map((payroll) => (
            <div key={payroll._id}>
              <p className="p-tag-recent payrolls">
                <FiberManualRecordTwoToneIcon className="recent-icon" />
                {`Employee ${payroll.empName} Was Paid Rs :  ${payroll.netPay} on ${payroll.createdAt}`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="p-tag-recent notfound">No Recent Payrolls Found.</p>
      )}
    </motion.div>
  );
};
