// Lightbox carousel — opens all image links on the page as a navigable popup.
// Clicking outside the image (on the overlay) closes it.

(function () {

  function isImageHref(url) {
    return url && /\.(jpg|jpeg|png|gif|webp)(\.\w+)?$/i.test(url);
  }

  document.addEventListener('DOMContentLoaded', function () {

    // --- Collect all image-linked <a> tags on the page ---
    var allLinks = Array.from(document.querySelectorAll('a[href]'));
    var imageLinks = allLinks.filter(function (a) {
      return isImageHref(a.getAttribute('href')) && !a.classList.contains('no-lightbox');
    });

    if (imageLinks.length === 0) return;

    // --- Build overlay HTML ---
    var overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    overlay.innerHTML =
      '<div id="lb-inner">' +
        '<button id="lb-close" aria-label="Close">&#x2715;</button>' +
        '<button id="lb-prev" aria-label="Previous">&#x2190;</button>' +
        '<img id="lb-img" src="" alt="" />' +
        '<button id="lb-next" aria-label="Next">&#x2192;</button>' +
        '<p id="lb-caption"></p>' +
      '</div>';
    document.body.appendChild(overlay);

    var lbOverlay = document.getElementById('lb-overlay');
    var lbImg     = document.getElementById('lb-img');
    var lbCaption = document.getElementById('lb-caption');
    var lbPrev    = document.getElementById('lb-prev');
    var lbNext    = document.getElementById('lb-next');
    var lbClose   = document.getElementById('lb-close');

    var currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + imageLinks.length) % imageLinks.length;
      var a = imageLinks[currentIndex];
      var src = a.getAttribute('href');
      var alt = a.getAttribute('title') || a.querySelector('img') && a.querySelector('img').getAttribute('alt') || '';
      lbImg.src = src;
      lbImg.alt = alt;
      lbCaption.textContent = alt.replace(/_/g, ' ');
      lbOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lbOverlay.style.display = 'none';
      lbImg.src = '';
      document.body.style.overflow = '';
    }

    // Attach click handlers to all image links
    imageLinks.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        showImage(i);
      });
    });

    lbPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });

    lbNext.addEventListener('click', function (e) {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });

    lbClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });

    // Click on the dark overlay (outside the image box) closes it
    lbOverlay.addEventListener('click', function (e) {
      if (e.target === lbOverlay) closeLightbox();
    });

    // Keyboard: arrow keys and Escape
    document.addEventListener('keydown', function (e) {
      if (lbOverlay.style.display === 'flex') {
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        if (e.key === 'ArrowLeft')  showImage(currentIndex - 1);
        if (e.key === 'Escape')     closeLightbox();
      }
    });

  });

})();
