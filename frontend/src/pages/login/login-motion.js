export const containerVarients = {
  hidden: {
    y: -1000,
  },
  visible: {
    y: -10,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: "120",
    },
  },
};

export const svgVarients = {
  hidden: {
    rotate: 0,
  },
  visible: {
    rotate: [0, -45, 0, -45, 0],
    transition: {
      delay: 2.5,
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const buttonVariants = {
  btnHidden: {
    opacity: 0,
    x: "100vw",
  },
  btnVisible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 14,
      delay: 0.6,
    },
  },
};
export const buttonVariants2 = {
  btnHidden: {
    opacity: 0,
    x: "100vw",
  },
  btnVisible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 14,
      delay: 0.6,
    },
  },
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      yoyo: Infinity,
      duration: 0.4,
    },
  },
  tap: {
    scale: 0.9,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      yoyo: Infinity,
      duration: 0.4,
    },
  },
};

export const textVarients = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 0.7,
    transition: {
      delay: 1,
      duration: 3,
    },
  },
};
