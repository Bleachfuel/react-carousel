import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Children,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "./helpers/wrap";
import { verticalVariants, variants } from "./helpers/variants";
import Controls from "./components/Controls";
import Counter from "./components/Counter";
import Navigation from "./components/Navigation";

//Calculations for swipe
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

const Carousel = forwardRef(
  (
    {
      range = 1000,
      navigation = true,
      onChange,
      controls = true,
      swipeConfindence = 1000,
      intervalActive = true,
      children,
      className,
      drag = true,
      counter = [true, ''] ,
      interval = [false, 0],
      noExit = false,
      type = "horizontal",
      goToIndex,
    },
    ref
  ) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const pageCount = useMemo(() => Children.count(children), [children]);
    const pageIndex = wrap(0, pageCount, page);

    if (!children || pageCount === 0) {
      console.error(
        "Carousel: No children provided. Please provide content or images to display within the carousel."
      );
      return (
        <div className="carousel-error">
          No content provided for the carousel.
        </div>
      );
    }
    if (interval && interval[0] < 0) {
      console.error("Carousel: interval time is negative");
      return <div className="carousel-error">Negative interval.</div>;
    }

    ref &&
      useImperativeHandle(ref, () => ({
        paginate,
      }));
    //automatic slider
    useEffect(() => {
      const intervalId =
        intervalActive &&
        interval[0] &&
        setInterval(() => paginate(1), interval[1] * 1000);
      return () => clearInterval(intervalId);
    }, [intervalActive, interval]);

    //goToPage external
    useEffect(() => {
      if (goToIndex && goToIndex <= pageCount && goToIndex >= 0) {
        setPage((prevState) => [goToIndex, prevState[1]]);
      } else {
        console.error("invalid page");
      }
    }, [goToIndex]);
    //goToPage internal
    const goToPage = (number) => {
      if (number <= pageCount && number >= 0) {
        setPage((prevState) => [number, prevState[1]]);
      } else {
        console.error("invalid page");
      }
    };
    //paginaton
    const paginate = (newDirection) => {
      setPage((prevState) => [prevState[0] + newDirection, newDirection]);
      onChange && onChange(pageIndex);
    };

    return (
      <>
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            className={className}
            style={{ position: "relative" }}
            key={page}
            custom={direction}
            variants={
              type === "vertical" ? verticalVariants(range) : variants(range)
            }
            initial="enter"
            animate="center"
            {...(!noExit
              ? {
                  exit: "exit",
                }
              : {})}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            {...(drag
              ? {
                  drag: type === "vertical" ? "y" : "x",
                  dragConstraints:
                    type === "vertical"
                      ? { top: 0, bottom: 0 }
                      : { left: 0, right: 0 },
                  dragElastic: 1,
                  onDragEnd: (e, { offset, velocity }) => {
                    const swipe = swipePower(
                      type === "vertical" ? offset.y : offset.x,
                      type === "vertical" ? velocity.y : velocity.x
                    );
                    if (swipe < -swipeConfindence) {
                      paginate(1);
                    } else if (swipe > swipeConfindence) {
                      paginate(-1);
                    }
                  },
                }
              : {})}
          >
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              {Children.toArray(children)[pageIndex]}
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Optional components */}
        {controls && <Controls paginate={paginate} />}
        {counter && counter[0] && (
          <Counter
            counter={counter}
            pageIndex={pageIndex}
            pageCount={pageCount}
          />
        )}
        {navigation && (
          <Navigation
            pageCount={pageCount}
            goToPage={goToPage}
            pageIndex={pageIndex}
          />
        )}
      </>
    );
  }
);
Carousel.displayName = "Carousel";
export default Carousel;
