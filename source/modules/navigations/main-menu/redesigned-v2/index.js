import $ from 'jquery';
import { CLASSES } from '@/scripts/helpers/constants/classes';

export default () => {
  const { IS_OPEN, IS_FIXED } = CLASSES;

  const menuItem = $('.nav__item, .nav-dropdown__item');
  const menuItemWithDropdown = $('.has-dropdown, .has-submenu');
  const menuItemLink = menuItem.find('.nav__link');
  const dropdownMenu = $('.nav-dropdown, .nav-submenu');
  const dropdownMenuLink = dropdownMenu.find('.nav-dropdown__link');

  const fixedHeader = $('.page-header--fixed');
  const navTopHeight = $('.nav-top').height();
  let scroll;

  function checkScrollHeight() {
    scroll = $(window).scrollTop();

    if (scroll >= navTopHeight) {
      fixedHeader.addClass(IS_FIXED);
    } else {
      fixedHeader.removeClass(IS_FIXED);
    }
  }

  checkScrollHeight();

  $(window).scroll(() => {
    checkScrollHeight();
  });

  $(window).resize(() => {
    checkScrollHeight();
  });

  menuItemWithDropdown
    .on('mouseenter', function () {
      const currentItem = $(this);

      if (!currentItem.hasClass(IS_OPEN)) currentItem.addClass(IS_OPEN);
    })
    .on('mouseleave', function () {
      const currentItem = $(this);

      if (currentItem.hasClass(IS_OPEN)) currentItem.removeClass(IS_OPEN);
    })
    .on('click', function () {
      const currentItem = $(this);

      currentItem.toggleClass(IS_OPEN);
    });

  const closeAllDropdown = () => {
    menuItem.removeClass(IS_OPEN);
    dropdownMenuLink.parent().removeClass('is-hovered');
  };

  menuItemLink.on('focus', function () {
    const currentItemParent = $(this).parent();

    if (currentItemParent.hasClass('has-dropdown')) {
      if (!currentItemParent.hasClass(IS_OPEN)) {
        closeAllDropdown();
        currentItemParent.addClass(IS_OPEN);
      }
    } else {
      closeAllDropdown();
    }
  });

  dropdownMenuLink.on('focus', function () {
    const currentItemParent = $(this).parent();

    if (currentItemParent.hasClass('has-submenu')) {
      currentItemParent.addClass('is-hovered');
      if (!currentItemParent.hasClass(IS_OPEN)) {
        currentItemParent.addClass(IS_OPEN);
      }
    } else {
      dropdownMenuLink.parent().removeClass('is-hovered');
    }
  });
};
