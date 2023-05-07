import "./widget.scss";
import { motion } from "framer-motion";

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

export const Widget = () => {
  return (
    <motion.div className="widget" variants={scaleVariant} initial="initial" animate="animate">
      <div className="left">left</div>
      <div className="right">right</div>
    </motion.div>
  );
};
