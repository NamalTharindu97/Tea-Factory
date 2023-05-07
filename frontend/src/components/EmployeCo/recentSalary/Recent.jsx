import "./recent.scss";
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
export const Recent = () => {
  return (
    <motion.div className="recent" variants={scaleVariant} initial="initial" animate="animate">
      Recent
    </motion.div>
  );
};
