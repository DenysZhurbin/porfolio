import $ from 'jquery';
import "slick-carousel/slick/slick";
import "./plugins/masked"

const navButton = $(".quiz__arrow-next");
const unlockNavButton = () => {
  if (navButton.length) navButton.removeClass("is-disabled").removeAttr("disabled");
};
const lockNavButton = () => {
  if (navButton.length) navButton.addClass("is-disabled");
};

$(".js-start-quiz").on("click", function() {
  $(".page-section--quiz").addClass("is-visible");

  $(".js-quiz-slider").slick({
    draggable: false,
    infinite: false,
    slidesToScroll: 1,
    swipe: false,
    adaptiveHeight: true,
    nextArrow: $(".quiz__arrow-next"),
    speed: 200
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    if (slick.$slides.length-1 == nextSlide) {
      $(".js-quiz-calculate-result").show();
    } else {
      lockNavButton();
    }
  });

  $("body").css("overflow", "hidden");
});

$(".js-quiz-calculate-result").on("click", function() {
  if (!$(this).hasClass("is-disabled")) {
    $("body").css("overflow", "visible");
    $(".page-section--primary").hide();
    $(".page-section--quiz").hide();
    fillWeightProblemsValues(calculateWeightProblemsValue());
    $(".page-section--test-result").show();
  }
});

$("#quiz-desired-weight-input").on("input", function() {
  if ($(this).val().trim().length > 1) {
    $(".js-quiz-calculate-result").removeAttr("disabled");
    $(".js-quiz-calculate-result").removeClass("is-disabled");
  } else {
    $(".js-quiz-calculate-result").attr("disabled", "disabled");
    $(".js-quiz-calculate-result").addClass("is-disabled");
  }
});

$(document).find('input[name="phone"]').mask("+38(111) 111-11-11", {
  completed: function () {
    let filtered = this.val().replace(/[^0-9]/g, '');
    let code = filtered.substring(3, 5);
    let allowedCodes = ['50','66','99','67','68','96','97','39','98','95','93','63','91','92','94'];
    let prohibitedCodes = ['71', '72'];

    if (!(allowedCodes.includes(code) || prohibitedCodes.includes(code))) {
      this.val('');
      alert('Неверно указан мобильный номер телефона');
    }
    if (prohibitedCodes.includes(code)) {
      this.val('');
      alert('Мы не обслуживаем клиентов с кодами операторов (' + (prohibitedCodes.map(v => '0' + v).join(', ')) + ')');
    }
  }
});

$(".js-set-current-month").each(function() {
  const d = new Date();
  const p = new Date();
  const monthA = 'січень ,лютий,березень,квітень,травень,червень,липень,серпень,вересень,жовтень,листопад,грудень'.split(',');

  $(this).text(monthA[p.getMonth()]);
});

$(".js-set-current-month-with-day").each(function() {
  const d = new Date();
  const p = new Date(d.getTime() - 0 * 86400000);
  const monthB =
    'січня,лютого,березня,квітня,травня,чевня,липня,серпня,вересня,жовтня,листопада,грудня'
      .split(',');
  $(this).text(p.getDate() - 0 + ' ' + monthB[p.getMonth()] + ' ');
});

$("#quiz-weight-input").on("change", function() {
  window.currentW = $(this).val();
});

$("#quiz-desired-weight-input").on("change", function() {
  window.desiredW = $(this).val();
});

window.currentW = "100";
window.desiredW = "90";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function getCurrentDate() {
  return new Date(Date.now()).toLocaleString().slice(0, 10);
}

function setCurrentDate() {
  $(".js-set-current-date").each(function() {
    $(this).text(getCurrentDate());
  });
}

function calculateWeightProblemsValue() {
  const diff = Number(window.currentW) - Number(window.desiredW);

  if (diff <= 0) {
    return {
      val1: 0,
      val2: 0,
      val3: 0,
      val4: 0
    }
  } else if (diff >= 1 && diff <= 10) {
      return {
        val1: getRandomInt(0, 5),
        val2: getRandomInt(0, 5),
        val3: getRandomInt(0, 5),
        val4: getRandomInt(0, 5)
      }
  } else if (diff >= 11 && diff <= 25) {
      return {
        val1: getRandomInt(6, 20),
        val2: getRandomInt(6, 20),
        val3: getRandomInt(6, 20),
        val4: getRandomInt(6, 20)
      }
  } else if (diff >= 26 && diff <= 50) {
      return {
        val1: getRandomInt(21, 40),
        val2: getRandomInt(21, 40),
        val3: getRandomInt(21, 40),
        val4: getRandomInt(21, 40)
      }
  } else if (diff > 50) {
      return {
        val1: getRandomInt(41, 70),
        val2: getRandomInt(41, 70),
        val3: getRandomInt(41, 70),
        val4: getRandomInt(41, 70)
      }
  }
}

function fillWeightProblemsValues(values) {
  const { val1, val2, val3, val4 } = values;
  $(".js-weight-issue-1").text(`${val1}%`);
  $(".js-weight-issue-2").text(`${val2}%`);
  $(".js-weight-issue-3").text(`${val3}%`);
  $(".js-weight-issue-4").text(`${val4}%`);
}

function validateQuizForms() {
  $(".form-quiz-sex").find("input[type='radio']").on("change", function() {
    unlockNavButton();
  });

  $("#quiz-age-input").on("input", function() {
    if ($(this).val().length >= 1) {
      unlockNavButton();
    } else {
      lockNavButton();
    }
  });

  let heightValue = null;
  let weightValue = null;
  $("#quiz-height-input").on("input", function() {
    heightValue = $(this).val();
    if (heightValue && weightValue) {
      unlockNavButton();
    } else {
      lockNavButton();
    }
  });
  $("#quiz-weight-input").on("input", function() {
    weightValue = $(this).val();
    if (heightValue && weightValue) {
      unlockNavButton();
    } else {
      lockNavButton();
    }
  });

  $(".form-quiz-zones").find("input[type='checkbox']").on("change", function() {
    if ($(".form-quiz-zones").find('input[type="checkbox"]:checked').length) {
      unlockNavButton();
    } else {
      lockNavButton();
    }
  });

  $(".form-quiz-extra-weight-reasons").find("input[type='checkbox']").on("change", function() {
    if ($(".form-quiz-extra-weight-reasons").find('input[type="checkbox"]:checked').length) {
      unlockNavButton();
    } else {
      lockNavButton();
    }
  });

  $(".form-quiz-extra-weight").find("input[type='radio']").on("change", function() {
    unlockNavButton();
  });

  $(".form-quiz-slimming-value").find("input[type='radio']").on("change", function() {
    unlockNavButton();
  });
}

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - 30
  }, 1500);
});

validateQuizForms();
setCurrentDate();

let prodLeft = [2, 3, 4, 6, 7, 8, 9, 9, 11, 11, 12, 14, 14, 15, 15, 16, 16, 16, 17, 17, 18, 18];

function startCountingTimer(limitedSeconds) {
  let timeLeft = limitedSeconds;
  let secondsLeft, minutesLeft;
  let timerElement = document.querySelector('.time-limit');
  let count = setInterval(function(){
    if(timeLeft <= 0) {
      clearTimeout(count);
    } else {
      timeLeft--;
      let min = parseInt(timeLeft/60);
      minutesLeft = min.toString();
      if(minutesLeft.length === 1) {
        minutesLeft = '0'+ minutesLeft;
      }
      let sec = timeLeft%60;
      secondsLeft = sec.toString();
      if(secondsLeft.length === 1) {
        secondsLeft = '0'+ secondsLeft;
      }
      if(sec === 0) {
        document.querySelector('.order-limit__counter-value').innerHTML = prodLeft[min];
      }
      timerElement.innerHTML = minutesLeft+":"+secondsLeft;
    }
  },1000);

}

document.addEventListener('DOMContentLoaded', function () {
  let tstamp = window.localStorage.getItem('tstamp-l2xyg239');
  let limitedSeconds = 1278;
  let prodElement = document.querySelector('.order-limit__counter-value');

  if (tstamp !== null) {
    let now = Math.round(new Date().getTime() / 1000);
    let then = tstamp;
    limitedSeconds = limitedSeconds - (now - then);
    let prod = Math.floor(limitedSeconds/60);
    if (prod < 0) prod = 0;
    prodElement.innerHTML = prodLeft[prod];
  } else {
    tstamp = Math.round(new Date().getTime() / 1000);
    window.localStorage.setItem('tstamp-l2xyg239', tstamp);
    prodElement.innerHTML = 19;
  }

  startCountingTimer(limitedSeconds);
});