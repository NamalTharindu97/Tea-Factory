/* eslint-disable import/no-anonymous-default-export */
export const scaleVariant = {
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

export const scaleVariantInner = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 1.7,
      type: "tween",
    },
  },
};

export const scaleVariantCard = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 1.3,
      delay: 0.2,
      type: "tween",
    },
  },
};

export const navBarVariants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 120,
    },
  },
};
export const navBarVarientsOriginal = {
  initial: {
    y: -250,
  },
  animate: {
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: "120",
    },
  },
};

export const scaleVariantSheet = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.8,
      type: "tween",
    },
  },
};

export const sideBarVarients = {
  initial: {
    x: -250,
  },
  animate: {
    x: 0,
    transition: {
      delay: 0.85,
      type: "spring",
      stiffness: "120",
    },
  },
};

export const linkVarients = {
  animate: {
    transition: {
      type: "spring",
      stiffness: 250,
    },
  },
  whileHover: {
    scale: 1.2,
    color: "#111a2c",
    originX: 0,
  },
};

export const shadeVarients = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1.7,
    transition: {
      delay: 1,
      duration: 3,
    },
  },
};

export const UlVarients = {
  initial: {
    x: -250,
  },
  animate: {
    x: 0,
    transition: {
      delay: 1.3,
      type: "spring",
      stiffness: "120",
    },
  },
};
export const scaleVariantForm = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 1.0,
      delay: 0.5,
      type: "tween",
    },
  },
};

export const paySheetVarient = {
  initial: {
    y: -800,
  },
  animate: {
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: "120",
    },
  },
};
export default {
  scaleVariant,
  scaleVariantInner,
  scaleVariantCard,
  navBarVariants,
  navBarVarientsOriginal,
  scaleVariantSheet,
  UlVarients,
  shadeVarients,
  linkVarients,
  sideBarVarients,
  scaleVariantForm,
  paySheetVarient,
};
