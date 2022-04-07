import { enableElement } from '@/scripts/helpers/utils/enableElement';
import { redirectToSupportPage } from '@/scripts/helpers/utils/redirectToSupportPage';
import { CLASSES } from '@/scripts/helpers/constants/classes';
import { KEYCODES } from '@/scripts/helpers/constants/keyCodes';
import { HOSTS } from '@/scripts/helpers/constants/hosts';

// Include this to Header / Init Header functionality in Global file
const MainMenu = () => {
  const { LANG } = HOSTS;
  const { IS_ACTIVE, IS_OPEN } = CLASSES;
  const { ESC, ENTER } = KEYCODES;
  const userDropdownName = $('.user-dropdown-name');
  const userDropdownNameInput = $('.user-dropdown-name__input');
  const jsUserAccount = $('.js-user-account');
  const langToggler = $('.lang-toggler');

  $.fn.putCursorAtEnd = function () {
    return this.each(function () {
      // Cache references
      const $el = $(this);
      const el = this;
      // Only focus if input isn't already
      if (!$el.is(':focus')) {
        $el.focus();
      }
      // If this function exists... (IE 9+)
      if (el.setSelectionRange) {
        // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
        const len = $el.val().length * 2;

        // Timeout seems to be required for Blink
        setTimeout(() => {
          el.setSelectionRange(len, len);
        }, 1);
      } else {
        // As a fallback, replace the contents with itself
        // Doesn't work in Chrome, but Chrome supports setSelectionRange
        $el.val($el.val());
      }
      // Scroll to the bottom, in case we're in a tall textarea
      // (Necessary for Firefox and Chrome)
      this.scrollTop = 999999;
    });
  };

  userDropdownName.off();
  jsUserAccount.off();
  $('.main-menu__item.has-dropdown').off();

  const changeUserName = () => {
    let csrfToken = null;
    let firstName = null;
    let lastName = null;

    userDropdownNameInput.blur();

    if (userDropdownNameInput.val().trim().split(' ')[0]) firstName = userDropdownNameInput.val().trim().split(' ')[0];
    if (userDropdownNameInput.val().trim().split(' ')[1]) lastName = userDropdownNameInput.val().trim().split(' ')[1];
    if ($('input[name="action__changeFL"]').length) csrfToken = $('input[name="action__changeFL"]').val();

    // Set Placeholder if entered empty string
    if (userDropdownNameInput.val().trim().length < 1) {
      $('.user-dropdown-name__value').text('Your Name');
    } else {
      $('.user-dropdown-name__value').html(userDropdownNameInput.val().trim());
    }

    if (userDropdownName.hasClass(IS_ACTIVE)) userDropdownName.removeClass(IS_ACTIVE);

    const payload = {
      fname: firstName || '',
      lname: lastName || '',
      csrf: {
        token: csrfToken,
        prefix: 'action__',
        formName: 'action__changeFL',
      },
    };

    // initLoader();

    $.ajax({
      url: `/${LANG}/account/ajaxChangePersonalInfo`,
      type: 'POST',
      data: payload,
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType: 'json',
    });
  };

  $(document).off().on('click', (event) => {
    const target = $(event.target);

    // hide lang toggler dropdown by click outside
    if (target.closest(langToggler).length) {
      return;
    } if (langToggler.hasClass('has-dropdown')) {
      langToggler.removeClass('has-dropdown');
      return;
    }

    if (
      !target.closest(userDropdownName).length
      && userDropdownName.hasClass(IS_ACTIVE)
    ) {
      userDropdownName.removeClass(IS_ACTIVE);
      userDropdownNameInput.blur();
    }
    if (
      target.is(jsUserAccount)
      || target.closest(jsUserAccount).length
    ) {
      if (target.is($('.user-dropdown-summary__avatar .user-icon'))) redirectToSupportPage();
      else if (event.target.tagName === 'A') return;
      else if (target.closest($('.user-dropdown-summary__avatar .user-icon')).length) return false;
      else if (target.closest($('.user-dropdown-menu')).length) return false;
      else if (target.closest(jsUserAccount).length) $('.js-user-account').toggleClass(IS_OPEN);
    } else {
      jsUserAccount.removeClass(IS_OPEN);
      userDropdownName.removeClass(IS_ACTIVE);
    }
  });

  $(document).keydown((event) => {
    if (event.keyCode === ESC) {
      if (userDropdownName.hasClass(IS_ACTIVE)) userDropdownName.removeClass(IS_ACTIVE);
      else if (jsUserAccount.hasClass(IS_OPEN)) jsUserAccount.removeClass(IS_OPEN);
      userDropdownNameInput.blur();
    }

    if (event.keyCode === ENTER) {
      if ($(event.target).is(userDropdownNameInput)) changeUserName();
    }
  });

  $('.main-menu__item.has-dropdown')
    .on('mouseenter mouseover click', () => {
      // Delay for transition-delay applied on Main Menu item
      setTimeout(() => {
        jsUserAccount.removeClass(IS_OPEN);
      }, 200);
    })
    .on('mouseenter mouseover', function () {
      const currentItem = $(this);

      setTimeout(() => {
        if (!currentItem.hasClass(IS_OPEN)) currentItem.addClass(IS_OPEN);
      }, 200);
    })
    .on('mouseleave mouseout', function () {
      const currentItem = $(this);

      setTimeout(() => {
        if (currentItem.hasClass(IS_OPEN)) currentItem.removeClass(IS_OPEN);
      }, 200);
    })
    .on('click', function () {
      const currentItem = $(this);

      setTimeout(() => {
        currentItem.toggleClass(IS_OPEN);
      }, 190);
    });

  const closeAllSubmenu = () => {
    const _menuItem = $('.main-menu__item');
    const _dropdownMenuLink = $('.main-menu__dropdown').find('.main-menu__dropdown-link');

    _menuItem.removeClass(IS_OPEN);
    _dropdownMenuLink.parent().removeClass('is-hover');
  };

  $('.main-menu__item').find('.main-menu__link').on('focus', function () {
    const currentItemParent = $(this).parent();

    if (currentItemParent.hasClass('has-dropdown')) {
      setTimeout(() => {
        if (!currentItemParent.hasClass(IS_OPEN)) {
          closeAllSubmenu();
          currentItemParent.addClass(IS_OPEN);
        }
      }, 200);
    } else {
      closeAllSubmenu();
    }
  });

  $('.main-menu__dropdown').find('.main-menu__dropdown-link').on('focus', function () {
    const currentItemParent = $(this).parent();

    if (currentItemParent.hasClass('has-dropdown')) {
      currentItemParent.addClass('is-hover');
    } else {
      $('.main-menu__dropdown').find('.main-menu__dropdown-link').parent().removeClass('is-hover');
    }
  });

  jsUserAccount.find('.user-icon').on('focus', closeAllSubmenu);

  jsUserAccount.find('.user-icon').on('keydown', function (event) {
    if (event.keyCode === ENTER) {
      $(this)
        .parent()
        .trigger('click');
    }
  });

  userDropdownName.on('click', (event) => {
    const target = $(event.target);
    const _userNameValue = $('.user-dropdown-name__value');
    const valueToSet = _userNameValue.text();
    const _userNameSubmit = $('.user-dropdown-name__submit');

    if (target.is(_userNameSubmit) || target.is(_userNameSubmit)) return false;

    userDropdownName.addClass(IS_ACTIVE);
    enableElement(userDropdownNameInput);
    userDropdownNameInput
      .val(valueToSet)
      .focus()
      .putCursorAtEnd();
  });

  $('.user-dropdown-name__submit').on('click', changeUserName);
};

export default MainMenu;
