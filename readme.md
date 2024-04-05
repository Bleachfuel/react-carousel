
## ✨ React Responsive Framer Motion Carousel ✨

This carousel component provides a versatile and performant solution for displaying content or images within your React applications. It offers intuitive features that enhance user experience and empower developers with granular control over customization.

**Key Features:**

- **Seamless Swiping ( Touch-friendly ✋):** Enables users to navigate the carousel intuitively using touch gestures on mobile devices or dragging on desktop devices.
- **Infinite Sliding ( Neverending Loop 🔁):** Users can swipe the carousel indefinitely without hitting a border, creating a smooth and continuous browsing experience.
- **Navigation Buttons (Optional) (️ Control at your Fingertips 🧭):** Provide optional navigation buttons for users who prefer a more traditional control scheme, allowing them to easily switch between carousel items.
- **Customizable Transitions ( Smooth & Beautiful 🌸):** Leverages the power of Framer Motion for smooth and customizable transition animations between carousel items, creating a visually appealing flow.
- **Automatic Pagination (Optional) (⏱️ Set it and Forget it):** Allows automatic page transitions after a defined interval, providing a hands-free browsing experience.
- **Counter Display (Optional) ( Keep Track 🚨):** Displays a counter indicating the current page and total number of items, giving users a clear understanding of their position within the carousel.


##  **✨NEW FEATURE (SetLoading 🤩)✨**
> Ability to get state changes from the `carousel` everytime it loads new content 🚀🔄. 
> 
> - **`setLoading` (function):** Optional useState function that you can pass. The `carousel` will return 
> `true` each time it paginates.

## **Reduced Package Size by Removing Popmotion 📦📦**
> Previously, I utilized a compact utility function from Popmotion. However, with recent optimizations, it's no longer required. The `carousel` component retains its full functionality without it. While minimizing final package size 🚗💨. 


<br>
<br>
<br>

**Installation:**

   ```bash
   npm install react-responsive-framer-motion-carousel
   ```

   This single command installs the carousel component along with its necessary dependency `framer-motion` within your project. While you might not directly use `framer-motion` extensively in your code, it provides underlying animation capabilities that power the carousel's functionality. This library is optimized for small file sizes, so the overall impact on your project's final bundle should be minimal.

- **React as a Prerequisite:** Make sure you are using this component inside `react`
- **Alternative for Non-Animated Carousels:** If animations aren't a requirement in your carousel, you could explore lighter-weight carousel options that don't depend on `framer-motion` 🕊️.

I know that the name is long, but all others were already in use 😥😥


**Usage:**

Import the `Carousel` component into your React project and use it as follows:

```javascript
import Carousel from 'react-responsive-framer-motion-carousel';

function MyComponent() {
  return (
    <Carousel>
        {/* Replace with your carousel content */}
        <div id="1"></div>
        <div id="2"></div>
        <div id="3"></div>
    </Carousel>
  );
}
```
**⚠️IMPORTANT⚠️:** When creating content dynamically. I.E via mapping, don't forget to add keys for each component.



**Customization Options:**
- **`className` (string):** Add an additional CSS class name for styling purposes.
- **`drag` (boolean, default: `true`):** Enable or disable dragging/swiping functionality.
- **`controls` (boolean, default: `true`):** 
    - Show (true, default) or hide (false) navigation buttons that users can click on to move between carousel items.
    - You can customize the appearance of these buttons using CSS.
    The component provides pre-defined class names `next` and `prev` for targeting the buttons specifically.
- **`counter` (array, default: `[false, ""]`):** Optional counter configuration (array with two elements).
    - Element 0 (boolean): Controls visibility of the counter. Defaults to `false`.
        - `true`: Displays the counter.
        - `false`: Hides the counter.
    - Element 1 (string, optional): Custom string to display before the counter (if `counter[0]` is `true`). If omitted, an empty string is displayed. 
- **`noExit` (boolean, default: `false`):** Useful for stopping rendering issues with large objects; disables exit animation.
- **`swipeConfindence` (number, default: `1000`):** Adjust the sensitivity of swipe detection. Lower values make swiping easier, higher values make it harder.
- **`interval` (array, default: `[false, 0]`):** Configure automatic pagination:
    - First element (boolean): Enables automatic pagination (defaults to `false`).
    - Second element (number): Interval duration in seconds (defaults to `0`).
- **`intervalActive` (boolean, default: `true`):** Useful for controlling the interval. I.E stop the interval when hovering over something. 
- **`setLoading` (function):** Optional useState function that you can pass. The component will return 
`true` each time it paginates. More information down below.

**Example with Customization:**

```javascript
import Carousel from 'react-responsive-framer-motion-carousel';

function MyComponent() {
  return (
    <Carousel
      className="my-custom-carousel"
      drag={false} // Disable dragging
      counter={true} // Enable counter
      interval={[true, 3]} // Enable automatic pagination every 3 seconds
      intervalActive={true} // Activate the configured interval
      swipeConfindence={500} // Increase swipe sensitivity
    ></Carousel>
  );
}
```

**Example with loading**
```javascript
import Carousel from 'react-responsive-framer-motion-carousel';
import { useState } from "react"

function MyComponent() {
  const [loading, setLoading] = useState(true)

  // set loading to false when the image is loaded.
  const handleLoad = () => {
    setLoading(false)
  }
  return (
    <>
      {/*conditionally render loading if the content is being loaded*/}
      {loading && "loading..."}
      <Carousel setLoading={setLoading}>
        <img onLoad={handleLoad} src="" alt="" />
        <img onLoad={handleLoad} src="" alt="" />
        <img onLoad={handleLoad} src="" alt="" />
      </Carousel>
    </>
)

}
```
**⚠️IMPORTANT⚠️:** Each time you press the controls or drag the `carousel`, the `carousel` will set loading to `true`


**Contributing:**

I welcome contributions to improve this component! Feel free to submit pull requests or create issues on the project's GitHub repository [Github.com/Bleachfuel/react-carousel](https://github.com/Bleachfuel/react-carousel) 🤗.

**License:**

This project is licensed under the MIT License (see LICENSE file for details) 😇.
