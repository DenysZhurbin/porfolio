import { CLASSES } from "@/scripts/helpers/constants";

// Functions to switch / get element(s) attribute
export const disableElement = element => {
  if (element.length) {
    element.attr("disabled", true);
  }
};
export const enableElement = element => {
  if (element.length) {
    element.attr("disabled", false);
  }
};

export const resetForm = element => {
  // TODO create func restFormToState (form can be not always empty by default)
  if (element.length) {
    const inputs = element.find('.' + CLASSES.FORM_INPUT);

    inputs.each(function() {
      $(this).val("");
    });
  }
};
