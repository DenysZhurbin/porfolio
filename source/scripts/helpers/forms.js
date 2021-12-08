import "parsleyjs";
import selectric from "selectric";
import { startLoading, finishLoading } from '@/scripts/helpers/loaders';
import {
  disableElement,
  enableElement,
} from "@/scripts/helpers/elementsActions";
import { isFunction } from "@/scripts/helpers/is";
import { CLASSES, STRINGS } from "@/scripts/helpers/constants";

// todo add handleFormError fn

const { FORM_INPUT, FORM_SUBMIT, ERROR } = CLASSES;
const { REQUIRED_FIELD_ERROR_MESSAGE } = STRINGS;

const resetForm = element => {
  if (element.length) {
    const inputs = element.find(`.${FORM_INPUT}`);

    inputs.each(function() {
      $(this).val("");
    });
  }

  $('select')
    .prop('selectedIndex', 0)
    .selectric('refresh');
};


const addParsleyFieldAttrs = form => {
  const email = form.find('input[type="email"]');

  if (email.length) {
    if (!email.data("parsleyType")) {
      email.attr("data-parsley-type", "email");
    }
    if (!email.data("parsleyRequiredMessage")) {
      email.attr(
        "data-parsley-required-message",
        REQUIRED_FIELD_ERROR_MESSAGE
      );
    }
  }
};

const hideErrorByEvent = event => {
  $(`.${FORM_INPUT}`).on(event, function() {
    const input = $(this);
    input.parsley().reset();
  });
};

const handleParsleyActions = form => {
  form.attr("data-parsley-focus", "none");

  addParsleyFieldAttrs(form);

  form
    .parsley({
      requiredMessage: "This field is required"
    })
    .on("field:error", function() {
      const field = this.$element;
      const selectWrapperClass = ".selectric-wrapper";

      if (field.is("select")) {
        const selectWrapper = field.parents(selectWrapperClass);

        if (selectWrapper.length) selectWrapper.addClass(ERROR);
      }
    })
    .on("form:error", function() {
      const control = $(".parsley-error:first");
      const label = control
        .parent()
        .parent()
        .find(".form-label");
      const labelHeight = label.height() + 10;
      const controlTopOffset = control.offset().top - labelHeight;

      if (control.length && label.length && !label.inView())
        window.scrollTo({ top: controlTopOffset, behavior: "smooth" });
    });
  hideErrorByEvent("focus");
};

export const initCustomSelectPlugin = () => {
  const hideCustomSelectError = event => {
    const select = $(event);

    if (select.length && select.hasClass("parsley-error")) {
      const selectWrapper = select.parents(`.selectric-wrapper.${ERROR}`);

      if (selectWrapper.length) selectWrapper.removeClass(ERROR);
      select.parsley().reset();
    }
  };

  $("select").selectric({
    onBeforeOpen: function() {
      $("select").selectric("close");
    },
    onOpen: hideCustomSelectError,
    onChange: hideCustomSelectError,
    maxHeight: 282
  });
};

export const initFormFunctionality = (selector, submitCallback) => {
  const form = $(selector);

  if (form.length) {
    const submit = form.find(`.${FORM_SUBMIT}`);

    handleParsleyActions(form);

    form
      .parsley()
      .on("form:submit", function() {
        disableElement(submit);

        if (isFunction(submitCallback)) {
          form.on("submit", function(e) {
            e.preventDefault();
          });

          submitCallback(form);
          return false;
        }
      });

    const hasSelects = !!form.find("select").length;
    if (hasSelects) initCustomSelectPlugin();
  }
};

export const startFormCall = startLoading;

export const finishFormCall = () => {
  const forms = $("form");

  forms.each(function() {
    const form = $(this);
    const submit = form.find(FORM_SUBMIT);

    resetForm(form);
    enableElement(submit);
  });

  finishLoading();
};

export const initFormsFunctionality = (selectorsString, callback) => {
  const forms = $(`${selectorsString}`);

  forms.each(function() {
    const form = $(this);

    if (isFunction(callback)) {
      initFormFunctionality(form, callback);
    } else {
      initFormFunctionality(form)
    }
  });
};

export function selectricDisableAutoFill(selector) {
  selector = $(selector);
  if (selector.length) {
    const input = selector.parent().parent().find(".selectric-input");

    input.attr("autocomplete", "off");
    input.attr("type", "search");
  }
}
