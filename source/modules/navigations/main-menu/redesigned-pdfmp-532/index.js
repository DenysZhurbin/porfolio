import $ from 'jquery';
import { CLASSES } from '@/scripts/helpers/constants/classes';
import { KEYCODES } from '@/scripts/helpers/constants/keyCodes';
import { initSearch } from '@/modules/containers/search-engine/search-form';

const MainMenuRedesigned = () => {
  const { IS_OPEN, IS_HOVERED, IS_VISIBLE } = CLASSES;
  const { ENTER, ESC } = KEYCODES;
  const menuItem = $('.nav__item, .nav-dropdown__item');
  const menuItemWithDropdown = $('.has-dropdown, .has-submenu');
  const menuItemWithSearch = $('.has-search');
  const menuItemLinkSearch = menuItemWithSearch.find('.nav__link');
  const menuItemLink = menuItem.find('.nav__link');
  const menuTooltip = $('.nav__tooltip');
  const dropdownMenu = $('.nav-dropdown, .nav-submenu');
  const dropdownMenuLink = dropdownMenu.find('.nav-dropdown__link');
  const nav = $('.nav');

  if (nav.hasClass('nav--v3')) {
    initSearch();
  }

  menuItemLinkSearch.on('click', function () {
    const currentItem = $(this);

    if (!currentItem.parent().hasClass(IS_OPEN)) {
      currentItem.parent().addClass(IS_OPEN);
    } else {
      currentItem.parent().removeClass(IS_OPEN);
    }
  }).on('keyup', function (e) {
    if (e.keyCode === ENTER) {
      $(this).click();
    }
  }).on('mouseenter', () => {
    menuTooltip.addClass(IS_VISIBLE);
    menuItemWithSearch.removeClass(IS_OPEN);
  }).on('mouseleave', () => {
    menuTooltip.removeClass(IS_VISIBLE);
  });

  $(document).mouseup((e) => {
    const container = menuItemWithSearch;

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass(IS_OPEN);
    }
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
    dropdownMenuLink.parent().removeClass(IS_HOVERED);
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
      currentItemParent.addClass(IS_HOVERED);
      if (!currentItemParent.hasClass(IS_OPEN)) {
        currentItemParent.addClass(IS_OPEN);
      }
    } else {
      dropdownMenuLink.parent().removeClass(IS_HOVERED);
    }
  });

  // prevent dropdown hide on click
  $('.nav-dropdown').on('click', (e) => {
    if (e.target.tagName !== 'A') return false;
  });

  // hide search on esc press
  $(document).on('keydown', (e) => {
    if (e.keyCode === ESC) {
      $('.nav__item--search').removeClass('is-open');
    }
  });
};

export default MainMenuRedesigned;
