import "./widget.scss";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { scaleVariant } from "../../../asserts/EmployeAs/data/FramerMotionVarients";

export const Widget = ({ type, totalNet, payrollCount, totalTax, totalPay }) => {
  let data = 0;

  switch (type) {
    case "netPay":
      data = {
        title: "Total Net Pay",
        icon: (
          <LocalAtmIcon
            className="icon"
            style={{
              color: "#845EC2",
            }}
          />
        ),
        percentage: totalNet,
        max: 1000000,
        count: totalNet,
        color: "#00ffa8",
        currency: "Rs :  ",
      };
      break;
    case "totalTax":
      data = {
        title: "Total Tax Pay",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "#00C9A7",
            }}
          />
        ),
        percentage: totalTax,
        max: 1000000,
        count: totalTax,
        color: "#16ff00",
        currency: "Rs :  ",
      };
      break;
    case "PayRollCount":
      data = {
        title: "Payroll Count",
        icon: (
          <CurrencyExchangeIcon
            className="icon"
            style={{
              color: "#D23927",
            }}
          />
        ),
        percentage: payrollCount,
        max: 50,
        count: payrollCount,
        color: "#ff1717",
      };
      break;
    case "totalPay":
      data = {
        title: "Total Payment",
        icon: (
          <GroupAddIcon
            className="icon"
            style={{
              color: "#dffb56",
            }}
          />
        ),
        percentage: totalPay,
        max: 1000000,
        count: totalPay,
        color: "#000000",
        currency: "Rs :  ",
      };
      break;
    default:
  }

  return (
    <motion.div className="widget" variants={scaleVariant} initial="initial" animate="animate">
      <div className="left">
        <div className="left-top-coner">
          <CircularProgressbar
            value={data.percentage}
            maxValue={data.max}
            strokeWidth={5}
            styles={buildStyles({
              textColor: "red",
              pathColor: data.color,
              trailColor: "#ffffff",
            })}
          />
        </div>
        <div className="left-bottom-coner">
          {data.currency}
          {data.count}
        </div>
      </div>
      <div className="right">
        <div className="right-top-coner">{data.title}</div>
        <div className="right-left-coner">{data.icon}</div>
      </div>
    </motion.div>
  );
};
