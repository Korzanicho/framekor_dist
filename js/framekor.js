// Form
(function inputLabelUpDown(){
    let formInputs = document.querySelectorAll('.form-group');
    for(let formInput of formInputs){
        let inputs = formInput.querySelectorAll('input, textarea');
        for(let input of inputs){
            input.addEventListener('change', function(){
                checkInputValue(formInput, input);
            });

            window.addEventListener('load', function(){
                checkInputValue(formInput, input);
            });
        }
    }

    function checkInputValue(formInput, input){
        if(input.value!=""){
            formInput.classList.add('not-empty-input');
        }
        else{
            formInput.classList.remove('not-empty-input');
        }    
    }
})();


// Alert
(function alertDismissable(){
    let alerts = document.querySelectorAll(".dismissable");
    for(let alert of alerts){
        alert.insertAdjacentHTML('beforeend','<button class="close">&times;</button>');
        let closeBtn = alert.querySelector(".close");
        closeBtn.addEventListener("click", function(e){
            e.preventDefault();
            if(!alert.classList.contains("modal")){
                alert.className += " dismissed";
                setTimeout(function(){
                    alert.style.display = "none";
                }, 1000);
            }
        });
    }
})();


// Tab
(function tab(){
    let tabs = document.querySelectorAll(".tab");
    for(let tab of tabs){
        let menuItems = tab.querySelectorAll(".tab__menu li a");
        let activeTab = tab.querySelector(".tab__menu .active");
        let tabBodies = tab.querySelectorAll(".tab__body > div");
        
        let i = 1;
        for(let tabBody of tabBodies){
            tabBody.id = tab.id + "-tab-" + i++; 
        }
        
        
        i = 1;
        for(let menuItem of menuItems){
            
            menuItem.href = "#" + tab.id +"-tab-"+ i++;
            
            menuItem.addEventListener("click", function(event){
                event.preventDefault();
                
                let menuActiveItem = tab.querySelector(".tab__menu .active");
                if(menuActiveItem !== null){
                    menuActiveItem.classList.remove("active");                    
                    tab.querySelector(".tab__body > .show").classList.remove("show");
                }
                menuItem.classList.add("active");
                tab.querySelector(menuItem.getAttribute("href")).classList.add("show");
                
            });
        }


        if(activeTab !== null){
            let activeBodyItem = tab.querySelector(".tab__body " + activeTab.getAttribute("href"));
                            activeBodyItem.classList.add('show');
                        }
    }
})();


// POPUP
(function popUp(){
    let modalsBtns = document.querySelectorAll("[data-modal]");
    for(let modal of modalsBtns){
        let modalId = modal.getAttribute("data-modal");
        modal.addEventListener("click", function(e){
            e.preventDefault();
            document.querySelector("body").style.overflow = "hidden";
            document.querySelector(`#${modalId}`).style.display = "flex";

            setTimeout(function(){
                document.querySelector(`#${modalId}`).classList.add("show");
                setTimeout(function(){
                    if(document.querySelector(".modal .close")){
                        let modalBody = document.querySelector(".modal__body");
                        let modalClose = document.querySelector(".modal .close");
                        let fromTopToModal = modalBody.getBoundingClientRect().top;
                        let fromRightToModal = modalBody.getBoundingClientRect().left;
                        modalClose.style.top = `${fromTopToModal+10}px`;
                        modalClose.style.right =  `${fromRightToModal+10}px`;
                    }
                },299);
            }, 1)
            
        });
    }
    let modals = document.querySelectorAll(".modal");
    for(let modal of modals){
        let closeModal = modal.querySelector(".modal .close");
        closeModal.addEventListener("click", function(e){
            e.preventDefault();
            modal.classList.remove("show");
            document.querySelector("body").style.overflow = "auto";

            setTimeout(function(){
                modal.style.display = "none";
            },300);
        });
    }

})();


//Nav
(function navbar(){
    let navbarMobileMenuButtons = document.querySelectorAll("a.navbar__mobile-menu-button");
    for(let navbarMobileMenuButton of navbarMobileMenuButtons){
        navbarMobileMenuButton.addEventListener("click", function(e){
            e.preventDefault();
            let menu = document.querySelector(navbarMobileMenuButton.getAttribute("data-menu-id"));

            toogleFlex(menu);
        });
    }

    let setBodyMargin = (function setBodyMarginFunction(){
        if(document.querySelector(".navbar.fixed") !== null){
            let navbarFixed = document.querySelector(".navbar.fixed");
            document.querySelector("body").style.marginTop = navbarFixed.clientHeight+10+"px";
        }
        return setBodyMarginFunction;
    })();
    window.addEventListener("resize", function(){
        setBodyMargin();
    });

    window.addEventListener("scroll", function(){

        if(document.querySelector(".navbar.fixed") !== null){
            if(window.scrollY > 50){
                document.querySelector(".navbar.fixed").classList.add("compact");
            }
            else{
                document.querySelector(".navbar.fixed").classList.remove("compact");
            }
        };
    });

})();

// DROPDOWN
(function dropdown(){
    let dropdownMenus = document.querySelectorAll(".dropdown");
    for(let dropdownMenu of dropdownMenus){
        let dropdownMenuButton = dropdownMenu.querySelector(".dropdown-menu-button");
        dropdownMenuButton.addEventListener("click", function(e){
            e.preventDefault();
            let menu = dropdownMenu.querySelector(".dropdown-menu");
            toogleFlex(menu);
        });
    }
})();

function toogleFlex(element){
    if(getComputedStyle(element).display === "none"){
        element.style.display = "flex";
    }
    else{
        element.style.display = null;
    }
}

