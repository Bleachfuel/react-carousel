
declare module 'react-responsive-framer-motion-carousel' {
  export interface CarouselProps {
    /**
     * - The content or images to be displayed within the carousel.
     */
    children: React.ReactNode;
    /**
     * - An optional CSS class name for additional styling.
     */
    className?: string;
    /**
     * - A boolean flag (defaults to `true`) that determines whether dragging/swiping functionality should be enabled.
     */
    drag?: boolean;
    /**
     * - A boolean flag (defaults to `true`) that determines whether control buttons should be enabled.
     */
    controls?: boolean;
    /**
     * - Optional counter configuration (array with two elements):
     *   - `Element 0 (boolean):` Controls visibility of the counter. Defaults to false.
     *   - true: Displays the counter.
     *   - false: Hides the counter.
     *   - `Element 1 (string, optional):` Custom string to display before the counter (if counter[0] is true). If omitted, no string is displayed.
     */
    counter?: [boolean?, string?];
    /**
     * - A boolean flag (defaults to `false`) useful during issues. If set to `true`, it disables the exit animation, which may be helpful in rendering issues.
     */
    noExit?: boolean;
    /**
     * - A optional number for decreasing or increasing the confidence that a user is swiping.
     *   - Higher values make swiping easier.
     *   - Lower values make swiping harder.
     */
    swipeConfindence?: number;
    /**
     * - An optional array that configures automatic pagination using an interval.
     *   - `Element 0 (boolean)`: Specifies whether automatic pagination is enabled.
     *   - true: Enables automatic pagination.
     *   - false: Disables automatic pagination.
     *   - `Element 1 (number)`: Specifies the duration in seconds between automatic page transitions.
     */

    interval?: [boolean, number];
    /**
     * - A boolean flag (defaults to `true`) that controls whether the configured interval (if any) should be actively used. This provides further control over automatic pagination behavior.
     *   - Example: To toggle automatic pagination based on hovering over a `<div>` element:
     *     ```jsx
     *     import React, { useState } from 'react';
     *     import Carousel from 'react-responsive-framer-motion-carousel';
     *     
     *     const MyComponent = () => {
     *       const [isHovered, setIsHovered] = useState(false);
     *     
     *       return (
     *         <div
     *           onMouseEnter={() => setIsHovered(true)}
     *           onMouseLeave={() => setIsHovered(false)}
     *         >
     *           <Carousel intervalActive={isHovered}>
     *           </Carousel>
     *         </div>
     *       );
     *     };
     *     ```
     */
    intervalActive?: boolean;
    /**
     * - Optional: Declare a useState function inside here. Whenever the carousel loads, it returns true on the state. Useful for showing that content is being loaded.
     * - `Important:` The `carousel` will return true to the state when content changes.
     *   - Example:
     *     ```jsx
     *     import Carousel from 'react-responsive-framer-motion-carousel';
     *     import { useState } from 'react';
     *
     *     function MyComponent() {
     *       const [loading, setLoading] = useState(true);
     *
     *       // Set loading to false when the image is loaded.
     *       const handleLoad = () => {
     *         setLoading(false);
     *       };
     *
     *       return (
     *         <>
     *           // Conditionally render loading if the content is being loaded 
     *           {loading && 'Loading...'}
     *           <Carousel setLoading={setLoading}>
     *             <img onLoad={handleLoad} src="" alt="" />
     *             <img onLoad={handleLoad} src="" alt="" />
     *             <img onLoad={handleLoad} src="" alt="" />
     *           </Carousel>
     *         </>
     *       );
     *     }
     *     ```
     */
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  }

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
   * @param {} [props.setLoading] - Optional: Declare a useState function inside here. Whenever the carousel loads, it returns true on the state. Useful for showing that content is being loaded.
   * @returns {JSX.Element} The carousel component.
   */

  export default function Carousel(props: CarouselProps): JSX.Element;
}

