export const variants = (width) => ({
  enter: (direction) => ({
    x: direction > 0 ? width : -width, // Adjust x based on the width parameter
    opacity: 0,
  }),
  center: {
    zIndex: 2,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? width : -width, // Adjust x based on the width parameter
    opacity: 0,
  }),
});

export const verticalVariants = (height) => ({
  enter: (direction) => {
    return {
      y: direction > 0 ? height : -height,
      opacity: 0,
    };
  },
  center: {
    zIndex: 2,
    y: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
});
