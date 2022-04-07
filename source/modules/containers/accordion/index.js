import { KEYCODES } from '@/scripts/helpers/constants/keyCodes';
import $ from 'jquery';

export default mode => {
  const { ENTER } = KEYCODES;
  const element = $('.accordion');

  $.each(element, (key, value) => {
    const accordion = $(value);
    const panelTitle = accordion.find('.accordion__title, .js-accordion-title');
    const visibilityMode = mode || 'single';
    const transitionTime = 170;

    function hidePanels() {
      const activeTitles = panelTitle.filter(function () {
        return $(this).attr('aria-selected') === 'true';
      });

      $.each(activeTitles, function () {
        $(this).attr('aria-selected', 'false');
        $(this)
          .next()
          .slideUp(transitionTime);
      });
    }

    // Expand or collapse panels
    $.each(panelTitle, function () {
      const isOpen = $(this).attr('aria-selected');

      if (isOpen === 'true') {
        $(this)
          .next()
          .slideDown(transitionTime);
      } else {
        $(this)
          .next()
          .slideUp(transitionTime);
      }
    });

    if (visibilityMode === 'single') {
      panelTitle.on('click keyup', function (e) {
        if (e.type === 'click' || e.keyCode === ENTER) {
          const title = $(this);
          const panel = $(this).next();

          if (panel.length) {
            if (panel.is(':visible')) {
              $.each(panelTitle, () => {
                hidePanels();
              });
            } else {
              hidePanels();
              title.attr('aria-selected', 'true');
              panel.slideDown(transitionTime);
            }
          }
        }
      });
    } else if (visibilityMode === 'multiply') {
      panelTitle.on('click keyup', function (e) {
        if (e.type === 'click' || e.keyCode === ENTER) {
          const panel = $(this).next();

          if (panel.length) {
            panel.slideDown(transitionTime);
          } else {
            panel.slideUp(transitionTime);
          }
        }
      });
    }
  });
};
