var mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
var mobileMenu = document.getElementById('mobile-menu');
var VISIBLE = 'is-visible';
var subscriptionForm = document.getElementById('email-form');
var modalWindow = document.getElementById('modal-validation')

mobileMenuTrigger.addEventListener("click", function() {
    if (mobileMenu.classList.contains(VISIBLE)) {
        mobileMenu.classList.remove(VISIBLE);
    } else {
        mobileMenu.classList.add(VISIBLE);
    }
});

subscriptionForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var value = subscriptionForm.getElementsByClassName('input-email')[0].value;
    if (!validateEmail(value)) {
        showModal(modalWindow);
        return false; 
    }
});

modalWindow.addEventListener("click", function(event) {
    var target = event.target.className
    if (target === 'modal__overlay' || target === 'modal__c-btn-img') {
        closeModal(modalWindow);
    }
});

document.addEventListener('keydown', function(event) {
    var key = event.key; 
    if (key === "Escape") {
        closeModal(modalWindow);
    }
});

function validateEmail(string) {
    return String(string)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function showModal(e) {
    e.classList.add(VISIBLE)
}

function closeModal(e) {
    e.classList.remove(VISIBLE)
}