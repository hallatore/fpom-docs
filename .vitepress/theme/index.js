import DefaultTheme from "vitepress/theme";

import "./custom.css";
import "./imgsli.slider.css";
// import "./image-comparer.css";
// import "./image-comparer.js";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // This will only run on the client side
    if (typeof window !== "undefined") {
      import("./imgsli.slider.js");

      // Hook into router to run code after each page update
      router.onAfterRouteChanged = (to) => {
        if (window.imgsli) {
          window.imgsli.slider(document.querySelectorAll(".ImageComparer"));
        }
      };

      setTimeout(() => {
        if (window.imgsli) {
          window.imgsli.slider(document.querySelectorAll(".ImageComparer"));
        }
      }, 500);
    }
  },
};
