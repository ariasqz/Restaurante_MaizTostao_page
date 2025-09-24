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

// Script descarga
const PDF_URL = './img/MENUS EVENTOS 2025.pdf';
const SUGGESTED_FILENAME = 'Menu_especial_Eventos_2025.pdf';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('downloadBtn');
  if (!btn) return;

  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(PDF_URL, { mode: 'cors' });
      if (!res.ok) throw new Error('No se pudo obtener el archivo: ' + res.status);

      const blob = await res.blob();
      const tmpUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = tmpUrl;
      a.download = SUGGESTED_FILENAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(tmpUrl);
    } catch (err) {
      console.warn('Descarga via fetch falló, abriendo en nueva pestaña como fallback:', err);
      window.open(PDF_URL, '_blank', 'noopener');
    }
  });
});