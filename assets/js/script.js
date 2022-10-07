const header = document.querySelector('.header')
const menu = document.querySelector('.header__nav')
const burger = document.querySelector('.header__burger')

const bgMountains = document.querySelector('.bg-mountains')
const bgClouds = document.querySelector('.bg-clouds')

const scrollbar = document.querySelector('.page-nav__progress-bar')
const pageLinks = document.querySelectorAll('.page-link')
const pageNav = document.querySelector('.page-nav')
const headerLinks = document.querySelectorAll('.header-link')
const animItems = document.querySelectorAll('.animation')


const animate = ( animRepeat, domElement, k ) => {
    //animRepeat - if animation must be repeaded (true/false)
    //domElement - which dom element the function listens to
    //k - how meny percents must be dom element scrolled to start an animation (0.0 - 1)
    k = 1 - k / 100

    if(window.pageYOffset > domElement.getBoundingClientRect().bottom + window.pageYOffset - window.innerHeight - domElement.scrollHeight * k
    && window.pageYOffset < domElement.getBoundingClientRect().bottom + window.pageYOffset) {
        domElement.classList.add('anime')
    } else if (animRepeat
    && ((window.pageYOffset < domElement.getBoundingClientRect().bottom + window.pageYOffset - window.innerHeight - domElement.scrollHeight)
    || (window.pageYOffset > domElement.getBoundingClientRect().bottom + window.pageYOffset))) {
        domElement.classList.remove('anime')
    }
}

const openBurgerMenu = () => {
    header.classList.toggle('active')
    menu.classList.toggle('active')
    burger.classList.toggle('active')
    if (header.classList.contains('active')
    && menu.classList.contains('active')
    && burger.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

pageLinks.forEach(link => {

    link.addEventListener('click', (event) => {
        event.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        const scrollToPos = window.pageYOffset + target.getBoundingClientRect().top
        scroll({
            top: scrollToPos,
            behavior: "smooth"
        })
    })

});

window.addEventListener('scroll',() => {
    scrollbar.style.height = (window.pageYOffset * 100) / (document.documentElement.scrollHeight - window.innerHeight) + '%';

    animItems.forEach(title => {
        animate(false, title, 30)
    });

    if(window.pageYOffset < window.innerWidth) {
        bgMountains.style.bottom = scrollY / -5 + 'px'
        bgClouds.style.bottom = scrollY / 7 + 'px'
    }
    
    if(window.pageYOffset > 0) {
        pageNav.classList.add('scrolled')
    } else {
        pageNav.classList.remove('scrolled')
    }
    
})
window.addEventListener('load', ()=> {
    animItems.forEach(title => {
        animate(false, title, 30)
    });
})
window.addEventListener('resize', ()=> {
    if(header.classList.contains('active')
    || menu.classList.contains('active')
    || burger.classList.contains('active')) {
        openBurgerMenu()
    }
})
burger.addEventListener('click', openBurgerMenu)

headerLinks.forEach(link => {
    link.addEventListener('click', ()=> {
        if(header.classList.contains('active')
        || menu.classList.contains('active')
        || burger.classList.contains('active')) {
            openBurgerMenu()
        }
    })
})