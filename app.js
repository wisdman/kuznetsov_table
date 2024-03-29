document.addEventListener("DOMContentLoaded", function(event) {
    
    let fade = document.querySelector("#kt--fade");
    let controls = document.querySelector("#kt--controls");
    let forward = document.querySelector("#kt--control-slide--forward");
    let backward = document.querySelector("#kt--control-slide--backward");

    let zIndexCounter = 10;
    // let hammertime = new Hammer(document.querySelectorAll(".kt--container")[0]);
    // hammertime.get('rotate').set({ enable: true });
    // console.log(hammertime)
    // hammertime.on("rotate", (event) => {
    //     let rotatingCard = event.target.closest(".kt--document");
    //     rotatingCard.style.setProperty('--angle', event.angle + "deg");
    // });
    let openCard;

    let allZooms = document.querySelectorAll(".kt--control-zoom");
    console.log(allZooms);
    allZooms.forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("click");
            let allCards = document.querySelectorAll(".kt--card:not(.kt--card-active)");
            console.log(allCards);
            allCards.forEach(card => {
                console.log(card.classList);
                card.classList.remove("kt--card-active");
            });
            
            openCard = document.querySelector(btn.getAttribute("href"));
            console.log(openCard)
            openCard.classList.toggle("kt--card-active");
            
            openCard.classList.add("kt--flip-progress");
            openCard.addEventListener("transitionend", (event) => {
                if (event.propertyName == 'width') {
                    event.target.classList.remove("kt--flip-progress");
                }
            }, false);

            zIndexCounter+=10
            openCard.style.zIndex = zIndexCounter;
            fade.style.zIndex = zIndexCounter - 2;
            fade.classList.toggle("active");
            controls.classList.toggle("active");

            const cardNum = btn.getAttribute("href").match(/(\d+)/)[0];
            draggies[cardNum - 1].disable();
        });
    });

    let flips = document.querySelectorAll(".kt--control-slide");
    //let activeSlide = 1;
    flips.forEach(flip => {
        flip.addEventListener("click", (event) => {
            event.preventDefault();
            if(!flip.classList.contains("disabled")) {
                openCard.classList.toggle("kt--flip");

                flips.forEach(el => { el.classList.remove("disabled"); })
                flip.classList.toggle("disabled");
                //flip.classList.toggle("kt--control-slide--backward");
            }
            // else if(openCard.classList.contains("kt--multi") && !flip.classList.contains("disabled")) {
            //     //openCard.classList.add("kt--flip");
            //     activeSlide = openCard.style.getPropertyValue('--active-slide');
            //     forward.classList.remove("disabled");
            //     backward.classList.remove("disabled");
            //     if(!activeSlide) {
            //         activeSlide = 1;
            //     }

            //     let newSlide = activeSlide;
            //     if(flip.classList.contains("kt--control-slide--backward")) {
            //         newSlide++;
            //     }
            //     else newSlide--;

            //     if(newSlide > 4) {
            //         newSlide = 1;
            //         openCard.classList.toggle("kt--flip");
            //         forward.classList.add("disabled");
            //     }
            //     else if(newSlide < 1) {
            //         newSlide = 3;
            //         openCard.classList.toggle("kt--flip");
            //         forward.classList.remove("disabled");
            //         backward.classList.remove("disabled");
            //     }
            //     else if((newSlide == 3) && (activeSlide == 2)) {
            //         openCard.classList.toggle("kt--flip");
            //         forward.classList.remove("disabled");
            //         backward.classList.remove("disabled");
            //     }
            //     else if((newSlide == 2) && (activeSlide == 3)) {
            //         openCard.classList.toggle("kt--flip");
            //         forward.classList.remove("disabled");
            //         backward.classList.remove("disabled");
            //     }
            //     if(newSlide == 4) {
            //         backward.classList.add("disabled");
            //     }
            //     activeSlide = newSlide;
            //     openCard.style.setProperty('--active-slide', activeSlide);
            //     openCard.addEventListener(
            //         'webkitTransitionStart', 
            //         function( event ) {
            //             console.log('webkitTransitionStart');
            //             document.querySelectorAll(".kt--multi--slide").forEach(slide => {
            //                 slide.classList.remove("active");
            //             });
                        
            //             document.querySelector("#kt--multi--slide" + activeSlide).classList.add("active");
            //         }, false );
            //     document.querySelectorAll(".kt--multi--slide").forEach(slide => {
            //         slide.classList.remove("active");
            //     });
                
            //     document.querySelector("#kt--multi--slide" + activeSlide).classList.add("active");
            // }
        });    
    });

    let close = document.querySelector("#kt--control-close");
    close.addEventListener("click", (event) => {
        event.preventDefault();
        openCard.classList.add("kt--flip-progress");
        const cardNum = openCard.getAttribute("id").match(/(\d+)/)[0];
        draggies[cardNum - 1].enable();
        openCard.classList.remove("kt--card-active");
        openCard.classList.remove("kt--flip");

        fade.classList.remove("active");
        controls.classList.remove("active");
        openCard = undefined;
        forward.classList.add("disabled");
        backward.classList.remove("disabled");
        fade.style.zIndex = "";
    });

    let allButtons = document.querySelectorAll(".kt--button-open");
    allButtons.forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();let draggie = new Draggabilly('.kt--card');
            let openCard = document.querySelector(btn.getAttribute("href"));
            openCard.classList.toggle("active");
            fade.classList.add("active");
            if(btn.getAttribute("href") == "#kt--intro") {
                document.querySelector("#kt--intro-1").classList.add("active");
            }
            if(btn.getAttribute("href") == "#kt--intro-2") {
                document.querySelector("#kt--intro-1").classList.remove("active");
            }
            if(btn.getAttribute("href") == "#kt--intro-1") {
                document.querySelector("#kt--intro-2").classList.remove("active");
            }
        });
    });

    let allCloseButtons = document.querySelectorAll(".kt--button-close");
    allCloseButtons.forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            let openIntro = document.querySelector("#kt--intro");
            document.querySelector("#kt--intro-2").classList.remove("active");
            openIntro.classList.remove("active");
            fade.classList.remove("active");
        });
    });
    
    let draggableElems = document.querySelectorAll('.kt--card');
    // array of Draggabillies
    let draggies = []
    let hammers = []
    // init Draggabillies
    for ( let i=0; i < draggableElems.length; i++ ) {
        let draggableElem = draggableElems[i];
        let draggie = new Draggabilly( draggableElem, {
            containment: '.kt--container'
        });
        
        draggie.on( 'pointerDown', ( event, pointer ) => {
            for ( let j=0; j < draggableElems.length; j++ ) {
                draggableElems[j].classList.remove("on-top");
            }
            //draggableElem.classList.add("on-top");
            zIndexCounter++;
            window.requestAnimationFrame(() => {
                draggableElem.style.zIndex = zIndexCounter;
            });
        } );

        draggie.on( 'dragStart', ( event, pointer ) => {
            draggableElem.classList.add("kt-dragging");
        });

        draggie.on( 'dragEnd', ( event, pointer ) => {
            delay(300).then(() => window.requestAnimationFrame(() => draggableElem.classList.remove("kt-dragging")));
        });

        draggies.push( draggie );

        let hammertime = new Hammer(draggableElem);
        hammertime.get('rotate').set({ enable: true, threshold: 5 });
        console.log(hammertime)
        hammertime.on("rotatestart", (event) => {
            //lastRotation = currentRotation;
            let rotatingCard = event.target.closest(".kt--document");

            rotatingCard.style.setProperty('--last-rotation', parseInt(getComputedStyle(rotatingCard).getPropertyValue('--angle')));
            rotatingCard.style.setProperty('--start-rotation', Math.round(event.rotation));
        });
        hammertime.on("rotatemove", (event) => {
            let rotatingCard = event.target.closest(".kt--document");

            let diff = parseInt(getComputedStyle(rotatingCard).getPropertyValue('--start-rotation')) - Math.round(event.rotation);
            let lastRotation = parseInt(getComputedStyle(rotatingCard).getPropertyValue('--last-rotation'));
            let currentRotation = lastRotation - diff;
            rotatingCard.style.setProperty('--angle', currentRotation%360 + "deg");
        })
        hammertime.on("rotateend", (event) => {
            let rotatingCard = event.target.closest(".kt--document");

            rotatingCard.style.setProperty('--last-rotation', parseInt(getComputedStyle(rotatingCard).getPropertyValue('--angle')));
        })
        // hammertime.on("rotate", (event) => {
        //     let rotatingCard = event.target.closest(".kt--document");
        //     let rotatingCardParent = event.target.closest(".kt--card");
        //     console.log(event);
        //     if(rotatingCard) {
        //         rotatingCard.style.setProperty('--angle', event.rotation + "deg");
        //     }
        // });
        hammers.push( hammertime );
    }
});

let timer = new Date()

window.addEventListener("pointerup", () => {
    timer = new Date()
}, { passive:true });

(function loop() {
    if((new Date() - timer) >= 1000*60*5) {
        timer = new Date();
        window.location.reload()
    }
    setTimeout(loop, 60000)
})()

function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
