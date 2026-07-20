/* =====================================================
DOT Premium Landing Page
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*=============================================
    PRELOADER
    =============================================*/

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            document.body.classList.add("loaded");

        }, 700);

    });



    /*=============================================
    SCROLL PROGRESS BAR
    =============================================*/

    const progressBar =
        document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (scrollTop / height) * 100;

        progressBar.style.width =
            progress + "%";

    });



    /*=============================================
    NAVBAR MORPH
    =============================================*/

    const navbar =
        document.querySelector(".nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });



    /*=============================================
    BACK TO TOP
    =============================================*/

    const backToTop =
        document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 700) {

            backToTop.classList.add("show");

        }

        else {

            backToTop.classList.remove("show");

        }

    });



    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });
    /*=============================================
    SCROLL REVEAL
    =============================================*/

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15,

            rootMargin: "0px 0px -80px 0px"

        }

    );

    revealElements.forEach(el => {

        revealObserver.observe(el);

    });



    /*=============================================
    STAGGER ANIMATION
    =============================================*/

    const staggerGroups = document.querySelectorAll(

        ".trust-grid, .steps-grid, .highlight-grid, .social-grid"

    );

    staggerGroups.forEach(group => {

        const cards = group.children;

        [...cards].forEach((card, index) => {

            card.style.transitionDelay = `${index * 120}ms`;

        });

    });



    /*=============================================
    SMOOTH SCROLLING
    =============================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            const targetId = this.getAttribute("href");

            if(targetId === "#") return;

            const target = document.querySelector(targetId);

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });



    /*=============================================
    ACTIVE NAVIGATION
    =============================================*/

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(

        ".desktop-menu a"

    );

    function updateActiveNav(){

        let current = "";

        sections.forEach(section=>{

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if(window.scrollY >= top){

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(

        "scroll",

        updateActiveNav

    );



    /*=============================================
    PHONE PARALLAX
    =============================================*/

    const phoneOne =

        document.querySelector(".phone-one");

    const phoneTwo =

        document.querySelector(".phone-two");

    window.addEventListener("scroll",()=>{

        const y = window.scrollY;

        if(phoneOne){

            phoneOne.style.transform =

                `translateY(${y * 0.04}px) rotate(-10deg)`;

        }

        if(phoneTwo){

            phoneTwo.style.transform =

                `translateY(${-y * 0.04}px) rotate(10deg)`;

        }

    });



    /*=============================================
    BUTTON PRESS EFFECT
    =============================================*/

    const buttons = document.querySelectorAll(

        "button, .nav-cta, .store-buttons a, .download-buttons a"

    );

    buttons.forEach(button=>{

        button.addEventListener("click",(e)=>{

            button.classList.remove("ripple");

            void button.offsetWidth;

            button.classList.add("ripple");

        });

    });
      /*=============================================
    MOBILE MENU
    =============================================*/

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu-overlay");

    const mobileLinks =
        document.querySelectorAll(".mobile-links a");

    if(menuToggle && mobileMenu){

        menuToggle.addEventListener("click",()=>{

            mobileMenu.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

        mobileLinks.forEach(link=>{

            link.addEventListener("click",()=>{

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        });

        mobileMenu.addEventListener("click",(e)=>{

            if(e.target===mobileMenu){

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            }

        });

    }



    /*=============================================
    ESC TO CLOSE MENU
    =============================================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            mobileMenu?.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });



    /*=============================================
    FAQ ACCORDION
    =============================================*/

    const faqs =
        document.querySelectorAll(".faq-item");

    faqs.forEach(item=>{

        item.addEventListener("toggle",()=>{

            if(item.open){

                faqs.forEach(other=>{

                    if(other!==item){

                        other.open=false;

                    }

                });

            }

        });

    });



    /*=============================================
    HERO MOUSE PARALLAX
    =============================================*/

    const hero =
        document.querySelector(".hero");

    const glow =
        document.querySelector(".glow");

    if(hero && glow){

        hero.addEventListener("mousemove",(e)=>{

            const rect =
                hero.getBoundingClientRect();

            const x =
                (e.clientX-rect.left)/rect.width;

            const y =
                (e.clientY-rect.top)/rect.height;

            glow.style.transform=

            `translate(
                ${(x-.5)*40}px,
                ${(y-.5)*40}px
            )`;

        });

        hero.addEventListener("mouseleave",()=>{

            glow.style.transform="translate(0,0)";

        });

    }



    /*=============================================
    BUTTON RIPPLE POSITION
    =============================================*/

    buttons.forEach(button=>{

        button.addEventListener("click",(e)=>{

            const rect=
                button.getBoundingClientRect();

            const x=
                e.clientX-rect.left;

            const y=
                e.clientY-rect.top;

            button.style.setProperty("--ripple-x",x+"px");

            button.style.setProperty("--ripple-y",y+"px");

        });

    });



    /*=============================================
    PERFORMANCE
    =============================================*/

    let ticking=false;

    function onScroll(){

        updateActiveNav();

        ticking=false;

    }

    window.addEventListener("scroll",()=>{

        if(!ticking){

            window.requestAnimationFrame(onScroll);

            ticking=true;

        }

    });



    /*=============================================
    IMAGE FADE-IN
    =============================================*/

    document.querySelectorAll("img").forEach(img=>{

        if(img.complete){

            img.classList.add("loaded");

        }

        img.addEventListener("load",()=>{

            img.classList.add("loaded");

        });

    });



    /*=============================================
    ACCESSIBILITY
    =============================================*/

    document.querySelectorAll("a").forEach(link=>{

        if(link.target==="_blank"){

            link.setAttribute(

                "aria-label",

                (link.getAttribute("aria-label") || link.textContent.trim()) +

                " (opens in new tab)"

            );

        }

    });



    /*=============================================
    INITIALIZE
    =============================================*/

    updateActiveNav();

    console.log(

        "%cDOT Premium Landing Page Loaded",

        "background:#FF6B35;color:white;padding:10px 18px;border-radius:8px;font-weight:bold;"

    );

});
