import Parallax from 'parallax-js';
import $ from "jquery";
import getOffsetTop from "@/scripts/helpers/dom/getOffsetTop";

const DOCUMENT_SCROLL_DURATION = 800;
const DOCUMENT_SCROLL_STYLE = "swing";

export const initParallaxDecorations = (sceneHandler) => {
  const parallaxInstance = new Parallax(sceneHandler[0], {
    pointerEvents: false,
    invertX: false,
    invertY: false,
    relativeInput: false,
    hoverOnly: true,
  });

  parallaxInstance.friction(0.2, 0.2);
};

export const scrollToMiddle = (id) => {
  const element = $(id);

  if (element.length) {
    const elemPosition = $(id).offset().top;
    const elemHeight = $(id).height();
    const windowHeight = $(window).height();
    const scrollPos = elemPosition + elemHeight / 2 - windowHeight / 2;

    $("html, body").animate(
      {
        scrollTop: scrollPos
      },
      DOCUMENT_SCROLL_DURATION,
      DOCUMENT_SCROLL_STYLE
    );
  }
};

export const scrollToTop = () => {
  $("html, body").animate(
    {
      scrollTop: 0
    },
    DOCUMENT_SCROLL_DURATION,
    DOCUMENT_SCROLL_STYLE
  );
};
