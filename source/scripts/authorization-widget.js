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
      const widget = $(modal).find(".authorization-widget");
      widget.attr("data-authorization-method", "registration");
    }
  });
});
let formState = {};
let passwords = {
  password: null,
  confirm: null
};

const handleFormValidation = form => {
  let i = form.attr("data-form-index");
  i = `'${i}'`;
  const fillFormState = () => {
    let _state = {};
    const textInputModel = {
      value: null,
      isValid: false
    };

    form.find("input").each(function() {
      const input = $(this);
      const name = input.attr("name");

      if (name === "input-login") _state[name] = textInputModel;
      else if (name === "input-email") _state[name] = textInputModel;
      else if (name === "input-name") _state[name] = textInputModel;
      else if (name === "input-messenger") _state[name] = textInputModel;
      else if (name === "input-password") _state[name] = textInputModel;
      else if (name === "input-password-confirm") _state[name] = textInputModel;
      else if (name === "agreement-checkbox") _state[name] = { isValid: false };
    });

    return _state;
  };

  formState[i] = fillFormState();

  function validateForm () {
    const submit = form.find(".form-submit");
    const allTrue = Object.keys(formState[i]).every(function(k){
      return formState[i][k].isValid === true
    });

    if (allTrue) {
      submit.removeClass("is-disabled");
    } else {
      submit.addClass("is-disabled");
    }
  }
  form.find(".form-input").on("input", function() {
    const input = $(this);
    const value = input.val();
    const name = input.attr("name");

    if (name === 'input-login') {
      bootstrapValidate(`form[data-form-index=${i}] input[name='input-login']`, 'min:3:Логин должен содержать минимум 3 символа', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].isValid = isValid;
        formState[i][name].value = value;
        validateForm();
      });
    } else if (name === "input-email") {
      bootstrapValidate(`form[data-form-index=${i}] input[name='input-email']`, 'email:Введите корректный e-mail', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].isValid = isValid;
        formState[i][name].value = value;
        validateForm();
      });
    } else if (name === "input-name") {
      bootstrapValidate(`form[data-form-index=${i}] input[name='input-name']`, 'min:2:Имя должно содержать минимум 2 символа', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].isValid = isValid;
        formState[i][name].value = value;
        validateForm();
      });
    } else if (name === "input-messenger") {
      bootstrapValidate(`form[data-form-index=${i}] input[name='input-messenger']`, 'min:2:Логин должен содержать минимум 2 символа', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].isValid = isValid;
        formState[i][name].value = value;
        validateForm();
      });
    } else if (name === "input-password") {
      bootstrapValidate(`form[data-form-index=${i}] input[name='input-password']`, 'min:6:Пароль должен содеражать минимум 6 символов', function (isValid) {
        if (isValid) {
          input.addClass("is-valid");
        }
        formState[i][name].isValid = isValid;
        formState[i][name].value = value;
        validateForm();
      });
    }
  });

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

    formState[i][name].isValid = input.is(":checked");

    validateForm();
  });
};

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
      const closestForm = $(this).parents(".form");

      closestForm.find(".form__text-switcher").removeClass("is-active");
      $(this).addClass("is-active");
    }
  });

  $(".form").each(function(i) {
    const form = $(this);
    form.attr('data-form-index', i);

    handleFormValidation(form);
  })
});




