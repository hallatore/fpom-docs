(function (imgsli) {
  var activeSlider = null;

  var getSliderElement = function (target) {
    return target.closest(".ImageComparer, [data-imgsli-slider]");
  };

  var itemMove = function (e) {
    if (!activeSlider) return;

    var x = e.pageX;
    if (e.touches && e.touches.length === 1) x = e.touches[0].pageX;
    if (x == null) return;

    e.preventDefault();

    var box = activeSlider.querySelector(".box");
    var sliderDiv = activeSlider.querySelector(".slider");
    var before = activeSlider.querySelector(".before");

    var offsetLeft = box.getBoundingClientRect().left;
    var left = Math.max(x - offsetLeft, 0);
    var max = parseInt(window.getComputedStyle(box).width);

    if (left < 0 || max - left < 1) return;

    sliderDiv.style.left = Math.min(max, left) + "px";
    before.style.right = Math.min(max, max - left) + "px";
  };

  var itemMoveStart = function (e) {
    if (activeSlider) return;

    var sliderElement = getSliderElement(e.target);
    if (!sliderElement) return;

    if (
      e.target.closest(".controls") != null ||
      e.target.closest("select") != null
    )
      return;

    if (e.pageX == null && (e.touches == null || e.touches.length > 1)) return;

    e.preventDefault();
    activeSlider = sliderElement;
    sliderElement.classList.add("sliding");
    itemMove(e);
  };

  var itemMoveStop = function (e) {
    if (!activeSlider) return;
    e.preventDefault();
    activeSlider.classList.remove("sliding");
    activeSlider = null;
  };

  var windowResize = function (sliderElement, ignoreReset) {
    if (ignoreReset === true) return;
    if (!sliderElement) {
      // Resize all sliders
      var sliders = document.querySelectorAll(
        ".ImageComparer, [data-imgsli-slider]"
      );
      for (var i = 0; i < sliders.length; i++) {
        var sliderDiv = sliders[i].querySelector(".slider");
        var before = sliders[i].querySelector(".before");
        if (sliderDiv) sliderDiv.style.left = "";
        if (before) before.style.right = "";
      }
      return;
    }

    var sliderDiv = sliderElement.querySelector(".slider");
    var before = sliderElement.querySelector(".before");
    if (sliderDiv) sliderDiv.style.left = "";
    if (before) before.style.right = "";
  };

  var drawImage = function (sliderElement) {
    setTimeout(function () {
      windowResize(sliderElement);
    }, 100);
    setTimeout(function () {
      windowResize(sliderElement);
    }, 500);
    setTimeout(function () {
      windowResize(sliderElement);
    }, 1000);
    setTimeout(function () {
      windowResize(sliderElement);
    }, 2000);
  };

  // Global event listeners using delegation
  document.addEventListener("mousedown", itemMoveStart);
  document.addEventListener("touchstart", itemMoveStart, { passive: true });

  window.addEventListener("mouseup", itemMoveStop);
  window.addEventListener("mousemove", itemMove);
  window.addEventListener("touchend", itemMoveStop);
  window.addEventListener("touchmove", itemMove);

  // Handle image load events
  document.addEventListener(
    "load",
    function (e) {
      if (e.target.tagName === "IMG") {
        var sliderElement = getSliderElement(e.target);
        if (sliderElement) {
          windowResize(sliderElement);
        }
      }
    },
    true
  ); // Use capture phase for load events

  window.addEventListener("resize", function () {
    windowResize();
  });

  window.addEventListener("orientationchange", function () {
    setTimeout(function () {
      windowResize();
    }, 500);
  });

  // Initialize sliders automatically when DOM is ready
  var initializeSliders = function () {
    var sliders = document.querySelectorAll(".ImageComparer");
    for (var i = 0; i < sliders.length; i++) {
      var element = sliders[i];
      if (!element.hasAttribute("data-imgsli-initialized")) {
        element.setAttribute("data-imgsli-initialized", "true");
        windowResize(element);
      }
    }
  };

  // Auto-initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSliders);
  } else {
    initializeSliders();
  }

  // Watch for dynamically added sliders
  if (window.MutationObserver) {
    var observer = new MutationObserver(function (mutations) {
      var shouldInit = false;
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            var node = mutation.addedNodes[i];
            if (node.nodeType === 1) {
              // Element node
              if (node.classList && node.classList.contains("ImageComparer")) {
                shouldInit = true;
              } else if (
                node.querySelector &&
                node.querySelector(".ImageComparer")
              ) {
                shouldInit = true;
              }
            }
          }
        }
      });
      if (shouldInit) {
        setTimeout(initializeSliders, 10);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Legacy API - simplified for backward compatibility
  imgsli.slider = function (elements, images, basePath) {
    // Just initialize the sliders without storing complex configs
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (!element.hasAttribute("data-imgsli-initialized")) {
        element.setAttribute("data-imgsli-initialized", "true");
        windowResize(element);
      }
    }
  };
})(window.imgsli || (window.imgsli = {}));
