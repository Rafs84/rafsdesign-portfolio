(() => {
  const images = [...document.querySelectorAll('img[data-animation]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function sync() {
    const animate = !reduced.matches && !document.hidden;
    images.forEach(img => {
      const source = animate ? img.dataset.animation : img.dataset.still;
      if (img.getAttribute('src') !== source) img.src = source;
    });
  }
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
})();
