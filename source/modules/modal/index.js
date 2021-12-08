import MicroModal from 'micromodal';
import $ from 'jquery';

const document = $('body');
export const lockClassName = 'scroll-locked';
export const modalAnimationDuration = 250;

export const microModalConfig = {
  disableScroll: false,
  awaitCloseAnimation: true,
  disableFocus: true,
  onShow: modal => {
    document.addClass(lockClassName);
    // disableBodyScroll(document);
  },
  onClose: modal => {
    setTimeout(() => {
      document.removeClass(lockClassName);
      // enableBodyScroll(document);
      // clearAllBodyScrollLocks();
    }, modalAnimationDuration);
  },
};

export default () => {
  MicroModal.init(microModalConfig);
};
