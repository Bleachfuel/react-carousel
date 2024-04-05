import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { wrap } from "./wrap";
import { verticalVariants, variants } from "./variants";

/** 
 * Carousel - A customizable carousel component for displaying images or content.
 *
 * This component allows users to navigate through a series of images or content using swiping gestures or navigation buttons. It provides various configuration options for a tailored user experience.
 *
 * @param {Object} props - Props for the carousel component.
 * @param {React.ReactNode} props.children - The content or images to be displayed within the carousel.
 * @param {string} [props.className] - An optional CSS class name for additional styling.
 * @param {boolean} [props.drag=true] - A boolean flag (defaults to `true`) that determines whether dragging/swiping functionality should be enabled.
 * @param {boolean} [props.controls=true] - A boolean flag (defaults to `true`) that determines whether control buttons should be enabled.
 *@param {Array} [props.counter] - Optional counter configuration (array with two elements).
    - Element 0 (boolean): Controls visibility of the counter. Defaults to false.
    true: Displays the counter.
    false: Hides the counter.
    - Element 1 (string, optional): Custom string to display before the counter (if counter[0] is true). If omitted, no string is displayed.
 * @param {boolean} [props.noExit=false] - A boolean flag (defaults to `false`) useful during issues. If set to `true`, it disables the exit animation, which may be helpful in rendering issues with big components.
 * @param {number} [props.swipeConfindence=1000] - A optional number for decreasing or increasing the confidence that a user is swiping
 * @param {Array} [props.interval=[false, 0]] - An optional array that configures automatic pagination using an interval.
    - The first element (`interval[0]`) is a boolean flag (defaults to `false`) that determines whether automatic pagination is enabled.
    - The second element (`interval[1]`) is a number (defaults to `0`) that specifies the duration (in seconds) between automatic page transitions.
 * @param {boolean} [props.intervalActive=true] - A boolean flag (defaults to `true`) that controls whether the configured interval (if any) should be actively used. This provides further control over automatic pagination behavior.
 * @param {string} [props.type="horizontal"] - Type of carousel. Possible values: "horizontal", "vertical".
 * @param {} [props.onChange] - Callback that returns the index when sliding. Useful for knowing when u should display a loading state.
 * @returns {JSX.Element} The carousel component.
 */







const Carousel = ({
    onChange,
    controls = true,
    swipeConfindence,
    intervalActive = true,
    children,
    className,
    drag = true,
    counter,
    interval = [false, 0],
    noExit = false,
    type = "horizontal"
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
        if (onChange) onChange(pageIndex);
    };
    return (
        <>
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                    className={className}
                    key={page}
                    custom={direction}
                    variants={type === "vertical" ? verticalVariants : variants}
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
                        drag: type === "vertical" ? "y" : "x",
                        dragConstraints: type === "vertical" ? { top: 0, bottom: 0 } : { left: 0, right: 0 },
                        dragElastic: 1,
                        onDragEnd: (e, { offset, velocity }) => {
                            const swipe = swipePower(
                                type === "vertical" ? offset.y : offset.x,
                                type === "vertical" ? velocity.y : velocity.x
                            );
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
