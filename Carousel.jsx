import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { wrap } from "./wrap";
import { variants } from "./variants";





const Carousel = ({
    setLoading,
    controls = true,
    swipeConfindence,
    intervalActive = true,
    children,
    className,
    drag = true,
    counter,
    interval = [false, 0],
    noExit = false,
}) => {
    if (!children || React.Children.count(children) === 0) {
        console.error("Carousel: No children provided. Please provide content or images to display within the carousel.");
        return <div className="carousel-error">No content provided for the carousel.</div>;
    }
    if (interval && interval[0] < 0) {
        console.error("Carousel: interval time is negative")
        return <div className="carousel-error">Negative interval.</div>
    }
    const [[page, direction], setPage] = useState([0, 0]);
    const pageCount = React.Children.count(children);
    const pageIndex = wrap(0, pageCount, page);


    //Calculations for swipe
    const swipeConfidenceThreshold = swipeConfindence ? swipeConfindence : 1000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    useEffect(() => {
        if (interval) {
            if (interval[0]) {
                let intervalId;
                if (intervalActive) {
                    intervalId = setInterval(() => {
                        paginate(1);
                    }, interval[1] * 1000);
                }
                return () => clearInterval(intervalId);
            }
        }
    }, [intervalActive, interval]);

    const paginate = (newDirection) => {
        setPage(prevState => [prevState[0] + newDirection, newDirection]);
        if (setLoading) setLoading(true);
    };
    return (
        <>
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                    className={className}
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    {...(!noExit ? {
                        exit: "exit"
                    } : {})}
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    {...(drag ? {
                        drag: "x",
                        dragConstraints: { left: 0, right: 0 },
                        dragElastic: 1,
                        onDragEnd: (e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }
                    } : {})}
                >
                    {React.Children.toArray(children)[pageIndex]}
                </motion.div>
            </AnimatePresence>
            {controls && (
                <>
                    <button name="next" className="next" onClick={() => paginate(1)}>Next</button>
                    <button name="prev" className="prev" onClick={() => paginate(-1)}>Prev</button>
                </>
            )}
            {
                counter && counter[0] && (
                    <span className="carousel-counter">{`${counter[1] ? counter[1] : ""} ${pageIndex + 1} / ${React.Children.toArray(children).length}`}</span>
                )
            }
        </>
    );
};

export default Carousel;
