import "./widget.scss";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const scaleVariant = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 1,
      type: "tween",
    },
  },
};

export const Widget = ({ type, totalNet, payrollCount, totalTax }) => {
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
    case "3":
      data = {
        title: "Total Payment",
        link: "View User Report",
        icon: (
          <GroupAddIcon
            className="icon"
            style={{
              color: "#dffb56",
            }}
          />
        ),
        percentage: 60,
        max: 100,
        count: 6,
        color: "#000000",
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
        <div className="left-bottom-coner">{data.count}</div>
      </div>
      <div className="right">
        <div className="right-top-coner">{data.title}</div>
        <div className="right-left-coner">{data.icon}</div>
      </div>
    </motion.div>
  );
};
