document.addEventListener("DOMContentLoaded", function(event) {
    
    let fade = document.querySelector("#kt--fade");
    let controls = document.querySelector("#kt--controls");
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
            zIndexCounter+=10
            openCard.style.zIndex = zIndexCounter;
            fade.style.zIndex = zIndexCounter - 1;
            fade.classList.toggle("active");
            controls.classList.toggle("active");
        });
    });

    let flip = document.querySelector("#kt--control-slide");
    flip.addEventListener("click", (event) => {
        event.preventDefault();
        openCard.classList.toggle("kt--flip");
        flip.classList.toggle("kt--control-slide--backward");
    });

    let close = document.querySelector("#kt--control-close");
    close.addEventListener("click", (event) => {
        event.preventDefault();
        openCard.classList.remove("kt--card-active");
        fade.classList.remove("active");
        controls.classList.remove("active");
        openCard = undefined;
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

function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }


  var currentRotation = 0, lastRotation, startRotation;
manager.on('rotatemove', function(e) {
    // do something cool
    var diff = startRotation - Math.round(e.rotation);
  currentRotation = lastRotation - diff;
    $.Velocity.hook($stage, 'rotateZ', currentRotation + 'deg');
});
manager.on('rotatestart', function(e) {
  lastRotation = currentRotation;
  startRotation = Math.round(e.rotation);
});
manager.on('rotateend', function(e) {
    // cache the rotation
    lastRotation = currentRotation;
});