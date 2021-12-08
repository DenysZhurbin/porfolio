import $ from "jquery";
import SimpleBar from "simplebar";
import { CLASSES } from "@/scripts/helpers/constants";

export default () => {
  const chatWidget = document.querySelector(".chat__widget");
  const chatButton = document.querySelector(".js-widget-button");
  const userMessage = document.getElementById("message-to-send");
  const textareaWrapper = document.getElementById("user-textarea");
  const chatCategories = document.querySelectorAll(".js-chat-category");
  const categories = document.querySelector(".js-chat-categories");
  const chatSubCategories = document.querySelectorAll(".js-chat-subcategories");
  const chatTooltipster = document.querySelector(".js-chat-tooltipster");
  const closeTooltipster = document.querySelector(".js-close-chat-tooltipster");

  chatButton.addEventListener("click", () => {
    chatButton.classList.toggle("widget-button__status--close");
    chatWidget.classList.toggle(CLASSES.IS_ACTIVE);
    initScroll(document.querySelector(".chat__conversation-area"));
    chatTooltipster.classList.remove("animated");
    chatTooltipster.classList.add(CLASSES.IS_HIDDEN);
  });

  closeTooltipster.addEventListener("click", () => {
    chatTooltipster.classList.add(CLASSES.IS_HIDDEN);
  });

  userMessage.addEventListener("focus", () => {});

  Array.from(chatCategories).forEach(category => {
    category.addEventListener("click", () => {
      const categoryType = category.getAttribute("data-attr");
      if (categoryType === "support_category") {
        const subCategories = document.querySelector(".js-chat-subcategories");
        categories.classList.add(CLASSES.IS_HIDDEN);
        subCategories.classList.add(CLASSES.IS_ACTIVE);
      }
      if (categoryType === "browsing")
        categories.classList.add(CLASSES.IS_HIDDEN);

      if (categoryType === "contact_sales")
        categories.classList.add(CLASSES.IS_HIDDEN);
    });
  });

  Array.from(chatSubCategories).forEach(subCategory => {
    subCategory.addEventListener("click", () => {
      const subCategories = document.querySelector(".js-chat-subcategories");
      subCategories.classList.remove(CLASSES.IS_ACTIVE);
    });
  });

  const trackMessageHeightArea = () => {
    setTimeout(() => {
      userMessage.style.cssText = "height:0px";
      let height = Math.min(20 * 5, userMessage.scrollHeight);
      textareaWrapper.style.cssText = "height:" + height + "px";
      userMessage.style.cssText = "height:" + height + "px";
    }, 0);
  };

  const initScroll = element => {
    const simpleBar = new SimpleBar(element, {
      autoHide: false,
      forceVisible: true
    });
    simpleBar.recalculate();
  };

  userMessage.addEventListener("keydown", trackMessageHeightArea);

  $(document).ready(function() {
    const chatButton = document.querySelector(".widget-button");
    setTimeout(chatButton.classList.add("animated"), 3000);
    setTimeout(chatTooltipster.classList.add("animated"), 4500);
  });
};
