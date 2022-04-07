import $ from 'jquery';
import { CLASSES } from '@/scripts/helpers/constants/classes';

export const categoriesMenu = (desktopLG) => {
  const { IS_OPEN } = CLASSES;
  const menu = '.js-categories-menu';

  if (desktopLG && $(menu).length) {
    $(menu).addClass('categories-menu--desktop-lg');
  }

  $(menu).on('click', function () {
    $(this).toggleClass(IS_OPEN);
  });

  $(document).click((e) => {
    if ($(e.target).closest(menu).length === 0 && $(menu).length) {
      $(menu).removeClass(IS_OPEN);
    }
  });
};
