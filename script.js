document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const menuContent = document.getElementById("menuContent");

    menuToggle.addEventListener("click", function () {
        menuContent.classList.toggle("show");

        if (menuContent.classList.contains("show")) {
            menuToggle.textContent = "Ocultar Carta";
        } else {
            menuToggle.textContent = "Menú";
        }
    });
});

// ===== Slider Automático =====
document.addEventListener("DOMContentLoaded", function () {
    const sliderTrack = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track img");
    let index = 0;

    function moveSlider() {
        index++;
        if (index >= slides.length) {
            index = 0;
        }
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(moveSlider, 3000); 
});
