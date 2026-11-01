(function () {
  function init(container) {
    if (container.dataset.carouselReady) return;
    container.dataset.carouselReady = 'true';

    var slides = Array.from(container.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;
    var current = 0;

    function show(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
    }

    container.querySelector('.carousel-btn.prev').addEventListener('click', function () {
      show(current - 1);
    });
    container.querySelector('.carousel-btn.next').addEventListener('click', function () {
      show(current + 1);
    });
    container.addEventListener('keydown', function (e) {
      var lightbox = document.getElementById('lb-overlay');
      if (lightbox && lightbox.style.display === 'flex') return;
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  document.querySelectorAll('.carousel-container').forEach(init);
})();
