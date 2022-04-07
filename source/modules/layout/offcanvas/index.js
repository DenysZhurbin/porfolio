import attrs from 'attrs';

import Plugin from '@/scripts/core/Plugin';
import init from '@/scripts/core/init';
import toArray from '@/scripts/helpers/dom/toArray';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

class Offcanvas extends Plugin {
  defaults() {
    return {
      triggerSelector: '[data-offcanvas-trigger], .mobile-menu-btn',
      menuSelector: '[data-offcanvas-menu]',
      containerSelector: '[data-offcanvas-container]',
      overlaySelector: '[data-offcanvas-overlay]',
    };
  }

  init() {
    this.setA11yAttributes();
  }

  destroy() {
    this.destroyCache();
    this.unBindEvents();
  }

  buildCache() {
    this.triggers = toArray(
      document.querySelectorAll(this.options.triggerSelector),
    );
    this.container = document.querySelector(this.options.containerSelector);
    this.overlay = document.querySelector(this.options.overlaySelector);
    this.menu = document.querySelector(this.options.menuSelector);
    this.body = document.querySelector('body');
    this.mobileMenu = document.querySelector('.mobile-menu');
  }

  destroyCache() {
    this.triggers = null;
    this.container = null;
    this.overlay = null;
    this.menu = null;
    this.body = null;
    this.mobileMenu = null;
  }

  bindEvents() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        this.triggerClickHandler();
      });
    });

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.hide());
    }
  }

  unBindEvents() {
    this.overlay.removeEventListener("click", () => {
      this.triggerClickHandler();
    });
  }

  triggerClickHandler() {
    this.toggle();
  }

  toggle() {
    this.isHidden() ? this.show() : this.hide();
  }

  hide() {
    this.menu.setAttribute('aria-hidden', 'true');
    this.container.setAttribute('data-offcanvas-hidden', 'true');
    this.overlay.setAttribute('data-offcanvas-hidden', 'true');
    this.triggers.forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'false');
    });
    enableBodyScroll(this.mobileMenu);
    clearAllBodyScrollLocks();
  }

  show() {
    disableBodyScroll(this.mobileMenu);
    this.menu.setAttribute('aria-hidden', 'false');
    this.container.setAttribute('data-offcanvas-hidden', 'false');
    this.overlay.setAttribute('data-offcanvas-hidden', 'false');
    this.triggers.forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'true');
    });
  }

  isHidden() {
    return this.menu.getAttribute('aria-hidden') === 'true';
  }

  setA11yAttributes() {
    this.container.setAttribute('data-offcanvas-hidden', 'true');

    if (this.menu) {
      attrs(this.menu, {
        role: 'dialog',
        tabindex: '-1',
        'aria-hidden': 'true',
      });
    }

    if (this.triggers && this.triggers.length > 0) {
      Array.prototype.forEach.call(this.triggers, trigger => {
        attrs(trigger, {
          role: 'button',
          'aria-pressed': 'false',
          'aria-expanded': 'false',
        });
      });
    }
  }
}

export default init(Offcanvas, "offcanvas");
