import $ from "jquery";

const loader = $(".loader");

const Loader = {
  show() {
    if (loader.length) loader.show();
  },
  hide() {
    if (loader.length) loader.hide();
  }
};

export default Loader;
