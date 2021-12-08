import $ from "jquery";
import lazyframe from "lazyframe";
import LazyLoad from "vanilla-lazyload";
import {
  KEYCODES
} from '@/scripts/helpers/constants';

const {ENTER} = KEYCODES;

export const execYoutubeCommand = (frame, command) => {
  if (frame.contentWindow === null) {
    return;
  }

  frame.contentWindow.postMessage(
    window.JSON.stringify({
      event: 'command',
      func: command,
      host: 'https://www.youtube.com/iframe_api',
    }),
    '*',
  );
};

export const modalHandler = (modal, command) => {
  const iframes = modal.querySelectorAll('iframe');

  [].forEach.call(iframes, frame => {
    execYoutubeCommand(frame, command);
  });
};


export const setLazyLoadingImages = () => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazyload",
    load_delay: 0
  });

  if (lazyLoadInstance) {
    lazyLoadInstance.update();
  }
};

export const setVideoLazyFrame = () => {
  // todo move selectors names to constants, use in pug mixin also
  const elements = $(".video-player__lazyframe, .lazyframe");

  lazyframe(elements, {
    onAppend: iframe => {
      $(iframe).attr("allow", "autoplay");
    },
  });

  elements.on('keyup', function (e) {
    if (e.keyCode === ENTER) {
      $(this).click();
    }
  });
};

export const loadCssWithCallback = (url, callback) => {
  var el = document.createElement("link");
  el.href = url;
  el.rel = "stylesheet";
  el.type = "text/css";
  document.head.appendChild(el);
  if (typeof (callback) == "function") {
    el.onload = callback(el);
  }
  return el;
};
