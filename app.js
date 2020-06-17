document.addEventListener("DOMContentLoaded", function(event) {

    let fade = document.querySelector("#kt--fade");

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
            btn.classList.toggle("kt--control-close");
            
            let openCard = document.querySelector(btn.getAttribute("href"));
            openCard.classList.toggle("kt--card-active");
            fade.classList.toggle("active");
        });
    });

    let allFlips = document.querySelectorAll(".kt--control-slide");
    allFlips.forEach(btn => {
        btn.addEventListener("click", (event) => {
            console.log("slide")
            event.preventDefault();
            let openCard = document.querySelector(btn.getAttribute("href"));
            openCard.classList.toggle("kt--flip");
        });
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
            draggableElem.classList.add("on-top");
        } );

        draggie.on( 'dragStart', ( event, pointer ) => {
            draggableElem.classList.add("kt-dragging");
        });

        draggie.on( 'dragEnd', ( event, pointer ) => {
            window.requestAnimationFrame(() => {
                draggableElem.classList.remove("kt-dragging");
            })
        });

        draggies.push( draggie );
    }
});