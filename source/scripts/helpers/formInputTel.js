import intlTelInput from "intl-tel-input/build/js/intlTelInput-jquery.min";
import "intl-tel-input/build/js/utils";

export const initIntlTelInputPlugin = () => {
  const phoneInput = $("#phone-number-input");

  if (phoneInput.length) {
    const iti = phoneInput.intlTelInput({
      separateDialCode: true
    });

    const itiParent = document.querySelector(".iti");

    const phoneInputValue = document.createElement("input");
    phoneInputValue.type = "hidden";
    phoneInputValue.name = "phone";
    itiParent.appendChild(phoneInputValue);

    phoneInput.on("keyup countrychange", function() {
      phoneInput.attr("value", iti.intlTelInput("getNumber"));
      phoneInputValue.value = iti.intlTelInput("getNumber");
    });
  }
};
