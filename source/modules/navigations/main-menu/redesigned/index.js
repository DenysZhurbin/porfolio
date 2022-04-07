import $ from 'jquery';
import { CLASSES } from '@/scripts/helpers/constants/classes';

export default () => {
  const menuItem = $('.nav__item, .nav-dropdown__item');
  const menuItemWithDropdown = $('.has-dropdown, .has-submenu');
  const menuItemLink = menuItem.find('.nav__link');
  const dropdownMenu = $('.nav-dropdown, .nav-submenu');
  const dropdownMenuLink = dropdownMenu.find('.nav-dropdown__link');

  menuItemWithDropdown
    .on('mouseenter', function () {
      const currentItem = $(this);

      if (!currentItem.hasClass(CLASSES.IS_OPEN)) currentItem.addClass(CLASSES.IS_OPEN);
    })
    .on('mouseleave', function () {
      const currentItem = $(this);

      if (currentItem.hasClass(CLASSES.IS_OPEN)) currentItem.removeClass(CLASSES.IS_OPEN);
    })
    .on('click', function () {
      const currentItem = $(this);

      currentItem.toggleClass(CLASSES.IS_OPEN);
    });

  const closeAllDropdown = () => {
    menuItem.removeClass(CLASSES.IS_OPEN);
    dropdownMenuLink.parent().removeClass('is-hover');
  };

  menuItemLink.on('focus', function () {
    const currentItemParent = $(this).parent();

    if (currentItemParent.hasClass('has-dropdown')) {
      if (!currentItemParent.hasClass(CLASSES.IS_OPEN)) {
        closeAllDropdown();
        currentItemParent.addClass(CLASSES.IS_OPEN);
      }
    } else {
      closeAllDropdown();
    }
  });

  dropdownMenuLink.on('focus', function () {
    const currentItemParent = $(this).parent();

    if (currentItemParent.hasClass('has-submenu')) {
      currentItemParent.addClass('is-hover');
      if (!currentItemParent.hasClass(CLASSES.IS_OPEN)) {
        currentItemParent.addClass(CLASSES.IS_OPEN);
      }
    } else {
      dropdownMenuLink.parent().removeClass('is-hover');
    }
  });
};
