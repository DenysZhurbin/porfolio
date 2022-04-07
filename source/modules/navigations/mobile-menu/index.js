import $ from 'jquery';
import Plugin from '@/scripts/core/Plugin';
import init from '@/scripts/core/init';
import { CLASSES } from '@/scripts/helpers/constants/classes';
import { BREAKPOINTS } from '@/scripts/helpers/constants/breakPoints';
import { redirectToSupportPage } from '@/scripts/helpers/utils/redirectToSupportPage';

const { IS_ACTIVE } = CLASSES;
const { DESKTOP } = BREAKPOINTS;

// Include this to Header / Init Header functionality in Global file
class MobileMenu extends Plugin {
  init() {
    const mobileMenuDropDown = () => {
      // itemWithDropdown
      const itemDropDown = $('.main-menu-toggler');

      itemDropDown.on('click', function () {
        const animationDuration = 200;
        itemDropDown.not($(this)).removeClass('has-dropdown');
        $(this).toggleClass('has-dropdown');
        itemDropDown
          .not($(this))
          .find('.mobile-menu__submenu')
          .slideUp(animationDuration);
        $(this)
          .find('.mobile-menu__submenu')
          .slideToggle(animationDuration);
      });
    };
    // drop Mobile word
    // trackHeaderPosition
    // watch
    const mobileHeaderPosition = () => {
      let count = 0;
      let lastScrollTop = 0;
      // $ -
      // let -> const
      const $window = $(window);
      const headerBar = $('.page-header');
      const offSet = headerBar.innerHeight();

      if ($window.width() < DESKTOP) {
        headerBar.addClass(IS_ACTIVE);
        headerBar.change();
        $window.on('scroll', () => {
          const scrollTop = $window.scrollTop();
          count++;
          if (scrollTop > lastScrollTop && offSet < lastScrollTop) {
            headerBar.removeClass(IS_ACTIVE);
            headerBar.change();
          } else if (count % 30 === 0 || offSet > scrollTop) {
            headerBar.addClass(IS_ACTIVE);
            headerBar.change();
          }
          lastScrollTop = scrollTop;
        });
      }
    };

    $('.user-summary__avatar .user-icon').click(redirectToSupportPage);

    $(window).resize(() => {
      mobileHeaderPosition();
    });

    mobileHeaderPosition();
    mobileMenuDropDown();
  }
}

export default init(MobileMenu, 'mobile-menu');
