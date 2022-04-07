import $ from 'jquery';
import { CLASSES } from '@/scripts/helpers/constants/classes';
import { BREAKPOINTS } from '@/scripts/helpers/constants/breakPoints';
import { scrollToTop } from '@/scripts/helpers/animations/scrollToTop';

export default mode => {
  const { IS_VISIBLE } = CLASSES;
  const { TABLET, DESKTOP_LG } = BREAKPOINTS;
  const button = $('.button-scroll-up');
  const bottomOffset = button.outerHeight(true);
  let chatWrapper;
  let chatTooltip;
  let chatWrapperHeight;
  let chatTooltipHeight;
  let lastScrollTop = 0;

  function init() {
    chatWrapper = $('.sv-control-chat');
    chatTooltip = $('.sv-control-chat__popup');
    chatWrapperHeight = chatWrapper.outerHeight(true);
    chatTooltipHeight = chatTooltip.outerHeight(true);
  }

  init();

  button.on('click keyup', (e) => {
    e.preventDefault();
    scrollToTop();
  });

  $(window).scroll(function () {
    init();

    if (chatTooltip.length) {
      button.css('transform', `translateY(${-(chatWrapperHeight + chatTooltipHeight)}px)`);
    } else if (chatWrapper.length) {
      button.css('transform', `translateY(${-chatWrapperHeight}px)`);
    }

    const currentScrollTop = $(this).scrollTop();

    if (currentScrollTop <= lastScrollTop && currentScrollTop >= 200) {
      button.addClass(IS_VISIBLE);
    } else {
      button.removeClass(IS_VISIBLE);
    }

    lastScrollTop = currentScrollTop;

    if ($(window).scrollTop() + $(window).height() >= $(document).height() - bottomOffset) {
      if ($(window).width() > TABLET && $(window).width() < DESKTOP_LG) {
        button.addClass('is-at-the-bottom');
      }
    } else {
      button.removeClass('is-at-the-bottom');
    }
  });
};
