import $ from 'jquery';

export default () => {
  const wrapper = $('.bread-crumbs-wrapper');
  const elements = $('.bread-crumbs__item');
  const compactModeClassName = 'is-reduced';
  let summaryElementsWidth = 0;

  elements.each(function () {
    summaryElementsWidth = summaryElementsWidth + Math.round($(this).width());
  });

  const trackCompactMode = () => {
    let wrapperWidth = 0;

    if (wrapper.length) wrapperWidth = wrapper.width();

    const setCompactMode = () => {
      wrapper.addClass(compactModeClassName);
    };

    const setNormalMode = () => {
      if (wrapper.hasClass(compactModeClassName)) wrapper.removeClass(compactModeClassName);
    };

    if (summaryElementsWidth > wrapperWidth) setCompactMode();
    else setNormalMode();
  };

  $(window).on('load resize', trackCompactMode);
};
