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

export const Widget = ({ type }) => {
  let data = 0;

  switch (type) {
    case "netPay":
      data = {
        title: "Total Net Pay",
        icon: (
          <LocalAtmIcon
            className="icon"
            style={{
              color: "#095709",
            }}
          />
        ),
        percentage: 80,
        max: 100,
        count: 2560010.12,
        color: "#00ffa8",
      };
      break;
    case "1":
      data = {
        title: "Count",
        link: "View User Report",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "#095709",
            }}
          />
        ),
        percentage: 40,
        max: 100,
        count: 25,
        color: "#16ff00",
      };
      break;
    case "2":
      data = {
        title: "Payroll Count",
        link: "View User Report",
        icon: (
          <CurrencyExchangeIcon
            className="icon"
            style={{
              color: "#095709",
            }}
          />
        ),
        percentage: 80,
        max: 100,
        count: 20,
        color: "#ff1717",
      };
      break;
    case "3":
      data = {
        title: "User Count",
        link: "View User Report",
        icon: (
          <GroupAddIcon
            className="icon"
            style={{
              color: "#095709",
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
            // text={`${data.percentage}%`}
            maxValue={data.max}
            strokeWidth={5}
            styles={buildStyles({
              textColor: "red",
              pathColor: data.color,
              trailColor: "#ffffff",
              root: {
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              },
              textSize: "20px",
              pathTransitionDuration: 0.5,
              textShadow: "0 0 5px black",
              path: {
                stroke: "#16ff00",
                strokeLinecap: "butt",
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              trail: {
                stroke: "#ffffff",
                strokeLinecap: "butt",
              },
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
