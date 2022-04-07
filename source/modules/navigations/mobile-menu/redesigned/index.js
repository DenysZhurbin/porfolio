import $ from 'jquery';
import { CLASSES } from '@/scripts/helpers/constants/classes';

export default () => {
  const animationDuration = 350;
  const menuMobile = $('.nav-mobile');
  const submenuClass = '.nav-mobile-submenu';
  const dropdownClass = '.nav-mobile-dropdown';
  const itemDropDown = $('.nav-mobile__link--toggler');
  const itemSubmenu = $('.nav-mobile-dropdown__link--toggler');
  const itemSubmenuBack = $('.nav-mobile-submenu__link--back');

  if (menuMobile.length) {
    $('body').addClass('is-redesigned-menu');
  }

  const mobileMenuDropDown = () => {
    itemDropDown.on('click', function () {
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
    itemSubmenu.on('click', function () {
      const submenu = $(this).data('submenu');
      $(`.nav-mobile-submenu[data-submenu=${submenu}]`).addClass(
        CLASSES.IS_OPEN,
      );
      menuMobile.addClass('has-submenu');
    });

    itemSubmenuBack.on('click', () => {
      menuMobile.removeClass('has-submenu');
      setTimeout(() => {
        $(submenuClass).removeClass(CLASSES.IS_OPEN);
      }, animationDuration * 2);
    });
  };

  const mobileHeaderPosition = () => {
    let count = 0;
    let lastScrollTop = 0;

    const $window = $(window);
    const headerBar = $('.page-header');
    const desktopWidth = 960;
    const offSet = headerBar.innerHeight();

    if ($window.width() < desktopWidth) {
      headerBar.addClass(CLASSES.IS_ACTIVE);
      $window.on('scroll', () => {
        const scrollTop = $window.scrollTop();
        count++;
        if (scrollTop > lastScrollTop && offSet < lastScrollTop) {
          headerBar.removeClass(CLASSES.IS_ACTIVE);
        } else if (count % 30 === 0 || offSet > scrollTop) {
          headerBar.addClass(CLASSES.IS_ACTIVE);
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
