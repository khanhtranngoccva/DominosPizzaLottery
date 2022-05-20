"use strict";
(function() {
    let currentPizzaFaceIsDomino = true;
    const pizzaElement = document.querySelector(".transformGroup");
    const button = document.querySelector("button");
    const h1 = document.querySelector("h1");
    async function rollThePizza() {
        button.classList.add("hidden");
        const response = await (await fetch("/api")).json();
        let {result} = response;
        console.log(response);
        if (result === true && currentPizzaFaceIsDomino === true) {
            await animateAndWait(pizzaElement, "rotateDominos 5s forwards");
        } else if (result === true && currentPizzaFaceIsDomino === false) {
            await animateAndWait(pizzaElement, "rotateDominosFromPapaJohns 5s forwards");
        } else if (result === false && currentPizzaFaceIsDomino === true) {
            await animateAndWait(pizzaElement, "rotatePapaJohns 5s forwards");
        } else if (result === false && currentPizzaFaceIsDomino === false) {
            await animateAndWait(pizzaElement, "rotatePapaJohnsFromPapaJohns 5s forwards");
        }
        if (result) h1.innerText = "Domino's! All aboard the train to flavor town!";
        else h1.innerText = "Papa John's? Papa John's? Let's scram."
        setTimeout(() => button.classList.remove("hidden"), 500);
    }

    function animateAndWait(element, animationString) {
        element.style.animation = "none";
        setTimeout(() => element.style.animation = animationString, 10);
        return new Promise(resolve => {
            function endAnimation() {
                element.removeEventListener("animationend", endAnimation);
                resolve(true);
            }
            element.addEventListener("animationend", endAnimation);
        })
    }

    button.addEventListener("click", rollThePizza);
})();