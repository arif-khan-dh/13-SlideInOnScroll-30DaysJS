const debounce = (fn, delay) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

const imgWrappers = document.querySelectorAll('.img-wrapper');
const scrollIndicator = document.getElementById('scroll-indicator');
const header = document.querySelector('header');
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section');
const menus = document.querySelectorAll('nav li');

window.addEventListener('scroll', handleScroll);

let windowTop, windowBottom, windowMiddle;
let imgTop, imgMiddle, imgBottom;

(() => {
    slideInImages();
})();

function slideInImages() {
    windowTop = window.scrollY;
    windowBottom = window.scrollY + window.innerHeight;
    
    imgWrappers.forEach( (wrapper, index) => {
        imgTop = wrapper.offsetTop;
        imgBottom = wrapper.offsetTop + wrapper.offsetHeight;
        imgMiddle = wrapper.offsetTop + wrapper.offsetHeight / 2;

        // check if it(imgWrapper) is visible through window
        if(imgTop < windowBottom && imgBottom > windowTop) {
            if((index % 2)) {
                wrapper.classList.add('slide-in-right');  
            } else {
                wrapper.classList.add('slide-in-left');  
            }
                      
        }
        // check if it(imgWrapper) is NOT visible through window
         else if(imgBottom < windowTop || imgTop > windowBottom) {
            wrapper.classList.remove('slide-in-left', 'slide-in-right');            
        }
    })
}

function updateIndicator() {
    let scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let percentScrolled = document.documentElement.scrollTop / scrollableHeight * 100;
    scrollIndicator.style.backgroundSize = `${percentScrolled}%`;
}

function stickHeader() {
    windowTop = document.documentElement.scrollTop; 
    if(nav.offsetTop <= windowTop) {        
        header.classList.add('sticky');
    } 
     if(nav.offsetTop + 170 > windowTop){ // 170(px): distance from page-top to nav-top
        header.classList.remove('sticky');
    }
}

function selectMenu() {
    windowMiddle = document.documentElement.scrollTop + document.documentElement.clientHeight / 2;
    
    sections.forEach((section, index) => {
        let sectionBottom = section.offsetTop + section.offsetHeight;
        if(section.offsetTop < windowMiddle && sectionBottom > windowMiddle) {
            menus[index].classList.add('active');
        } else if (sectionBottom < windowMiddle || section.offsetTop > windowMiddle) {
            menus[index].classList.remove('active');
        }
        // console.log(section.offsetTop, section.offsetHeight, section.querySelector('h4').textContent);
    });
}

menus.forEach((menu, index) => {
    menu.addEventListener('click', () => {
        window.scroll({ top: sections[index].offsetTop - 170, behavior: "smooth"});
    });
}) ;

slideInImages = debounce(slideInImages, 100);
updateIndicator = debounce(updateIndicator, 100);
selectMenu = debounce(selectMenu, 100);

function handleScroll() {
    slideInImages();
    updateIndicator();
    stickHeader();
    selectMenu();
}

// function slideInImages(e) {
//     imgWrappers.forEach((wrapper,index) => {
        
//         // from window top to image height(half)
//         let halfHeightImageScrollY = wrapper.offsetTop + wrapper.offsetHeight / 2;
//         let windowBottomY = window.scrollY + window.innerHeight;
//         console.log(index,windowBottomY, halfHeightImageScrollY);
//         if(windowBottomY > halfHeightImageScrollY) {
//             wrapper.classList.add('slide-in');
//         }  
//         if(wrapper.offsetTop > windowBottomY) {
//             wrapper.classList.remove('slide-in');
//         }

//         let imageBottomY = wrapper.offsetTop + wrapper.offsetHeight;
//         if(window.scrollY > imageBottomY) {
//             wrapper.classList.remove('slide-in');
//         }
//     });    
// }

