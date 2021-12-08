import $ from 'jquery';
import { Tooltip, Dropdown } from "bootstrap";
import bootstrapValidate from 'bootstrap-validate';
import MicroModal from 'micromodal';
import { microModalConfig } from '@/modules/modal';

const showModalById = (id, config = {}) => {
  const modal = $(`#${id}`);

  if (modal.length) {
    MicroModal.show(id, {
      ...microModalConfig,
      ...config
    });
  }
};

$(".js-show-modal-login").on("click", function(e) {
  e.preventDefault();

  showModalById("modal-authorization-widget", {
    onShow: modal => {
      const widget = $(modal).find(".authorization-widget");
      widget.attr("data-authorization-method", "login");
    }
  });
});

$(".js-show-modal-registration").on("click", function(e) {
  e.preventDefault();

  showModalById("modal-authorization-widget", {
    onShow: modal => {
      console.log("test");
      const widget = $(modal).find(".authorization-widget");
      widget.attr("data-authorization-method", "registration");
    }
  });
});

$(document).ready(function() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl)
  });

  const  dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));

  dropdownTriggerList.map(function (dropdownTriggerEl) {
    return new Dropdown(dropdownTriggerEl)
  });

  $("[data-form-mode]").on("click", function() {
    const clicked = $(this);
    const widgetContainer = $(this).parents(".authorization-widget");

    if (!clicked.hasClass("is-active")) {
      const mode = $(this).data("form-mode");

      widgetContainer.attr("data-authorization-method", mode);
    }
  });

  $(".form__text-switcher").on("click", function() {
    if (!$(this).hasClass("is-active")) {
      $(".form__text-switcher").removeClass("is-active");
      $(this).addClass("is-active");
    }
    // formState["user-category"] = $(this).data("form-user-category");
  });

  $(".form").each(function(i) {
    const form = $(this);

    let formState = {};

    formState[i] = {
      "input-login": {
        value: null,
        isValid: false
      },
      "input-email": {
        value: null,
        isValid: false
      },
      "input-name": {
        value: null,
        isValid: false
      },
      "input-messenger": {
        value: null,
        isValid: false
      },
      "input-password": {
        value: null,
        isValid: false
      },
      "input-password-confirm": {
        value: null,
        isValid: false
      },
      "agreement-checkbox": {
        isValid: false
      }
    };

    console.log(formState[i]);

    function validateForm () {
      const allTrue = Object.keys(formState[i]).every(function(k){
        return formState[i][k].isValid === true
      });

      if (allTrue) {
        form.find(".form-submit").removeClass("is-disabled");
      }
    }

    form.find(".form-input").on("input", function() {
      const input = $(this);
      const value = input.val();
      const name = input.attr("name");

      bootstrapValidate("input[name='input-login']", 'min:3:Логин должен содержать минимум 3 символа', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].value = value;
        formState[i][name].isValid = isValid;
      });

      bootstrapValidate("input[name='input-email']", 'email:Введите корректный e-mail', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].value = value;
        formState[i][name].isValid = isValid;
      });

      bootstrapValidate("input[name='input-name']", 'min:2:Имя должно содержать минимум 2 символа', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].value = value;
        formState[i][name].isValid = isValid;
      });

      bootstrapValidate("input[name='input-messenger']", 'min:2:Логин должен содержать минимум 2 символа', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].value = value;
        formState[i][name].isValid = isValid;
      });

      bootstrapValidate("input[name='input-password']", 'required:Необходимо ввести пароль|min:6:Пароль должен содеражать минимум 6 символов', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].value = value;
        formState[i][name].isValid = isValid;
      });
      validateForm();
    });

    let passwords = {
      password: null,
      confirm: null
    };

    form.find("input[name='input-password']").on("input", function() {
      passwords.password = $(this).val();
    });

    form.find("input[name='input-password-confirm']").on("input", function() {
      const input = $(this);
      const container = input.parent();
      const message = container.find(".invalid-feedback");
      const value = input.val();
      const name = input.attr("name");

      passwords.confirm = value;

      if (!value.length) {
        if (message.length) message.remove();
      } else if (passwords.password && passwords.password !== passwords.confirm) {
        if (!message.length) {
          input.addClass("is-invalid");
          container.append("<div class='invalid-feedback'>Пароли не совпадают</div>");
        }
      } else if (passwords.password && passwords.confirm && passwords.password === passwords.confirm) {
        input.removeClass("is-invalid").addClass("is-valid");
        if (message.length) message.remove();
        formState[i][name].isValid = true;
      }
      formState[i][name].value = value;

      validateForm();
    });

    form.find(".js-registration-messenger-dropdown .dropdown-item").on("click", function() {
      const item = $(this);
      const attribute = item.data("registration-messanger");
      const input = item.parent().parent().find(".form-input");

      input.attr("placeholder", attribute);
    });

    form.find("[name='agreement-checkbox']").on("change", function() {
      const input = $(this);
      const name = input.attr("name");

      formState[name].isValid = input.is(":checked");

      validateForm();
    });
  })
});




