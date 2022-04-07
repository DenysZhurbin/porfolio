import $ from 'jquery';
import { CLASSES } from '@/scripts/helpers/constants/classes';
import { BREAKPOINTS } from '@/scripts/helpers/constants/breakPoints';
import { initSearch } from '@/modules/containers/search-engine/search-form';

const { IS_OPEN, IS_ACTIVE } = CLASSES;
const { DESKTOP } = BREAKPOINTS;

const MobileMenuRedesigned = () => {
  const animationDuration = 350;
  const menuMobile = $('.nav-mobile');
  const submenuClass = '.nav-mobile-submenu';
  const dropdownClass = '.nav-mobile-dropdown';
  const itemDropDown = $('.nav-mobile__link--toggler');
  const itemSubmenu = $('.nav-mobile-dropdown__link--toggler');
  const itemSubmenuBack = $('.nav-mobile-submenu__link--back');

  if ($('.nav--v3').length) {
    initSearch();
  }

  if (menuMobile.length) {
    $('body').addClass('is-redesigned-menu');
  }

  const mobileMenuDropDown = () => {
    itemDropDown.off().on('click', function () {
      itemDropDown.not($(this)).removeClass('has-dropdown');
      $(this).toggleClass('has-dropdown');
      itemDropDown
        .not($(this))
        .siblings(dropdownClass)
        .slideUp(animationDuration);
      $(this)
        .siblings(dropdownClass)
        .slideToggle(animationDuration);
    });
  };

  const mobileMenuSubMenu = () => {
    itemSubmenu.off().on('click', function () {
      const submenu = $(this).data('submenu');
      $(`.nav-mobile-submenu[data-submenu=${submenu}]`).addClass(IS_OPEN);
      menuMobile.addClass('has-submenu');
    });

    itemSubmenuBack.off().on('click', () => {
      menuMobile.removeClass('has-submenu');
      setTimeout(() => {
        $(submenuClass).removeClass(IS_OPEN);
      }, animationDuration * 2);
    });
  };

  const mobileHeaderPosition = () => {
    let count = 0;
    let lastScrollTop = 0;

    const $window = $(window);
    const headerBar = $('.page-header');
    const offSet = headerBar.innerHeight();

    if ($window.width() < DESKTOP) {
      headerBar.addClass(IS_ACTIVE);
      $window.on('scroll', () => {
        const scrollTop = $window.scrollTop();
        count++;
        if (scrollTop > lastScrollTop && offSet < lastScrollTop) {
          headerBar.removeClass(IS_ACTIVE);
        } else if (count % 30 === 0 || offSet > scrollTop) {
          headerBar.addClass(IS_ACTIVE);
        }
        lastScrollTop = scrollTop;
      });
    }
  };

  $(window).resize(() => {
    mobileHeaderPosition();
  });

  mobileHeaderPosition();
  mobileMenuDropDown();
  mobileMenuSubMenu();
};

export default MobileMenuRedesigned;
