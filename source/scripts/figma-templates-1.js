var mobileMenu = document.getElementById('mobile-menu')
var mobileMenuItems = document.getElementById('mobile-menu__items')

mobileMenu.addEventListener("click", function(){
    if (mobileMenuItems.className == 'mobile-menu__items mobile-menu__items--visible') {
        mobileMenuItems.classList.remove('mobile-menu__items--visible');
    } else {
        mobileMenuItems.classList.add('mobile-menu__items--visible');
    }
});

