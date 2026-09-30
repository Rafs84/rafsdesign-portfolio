(() => {
  const capability = matchMedia('(hover: hover) and (pointer: fine)');
  const cards = [...document.querySelectorAll('a.all-card[href], .project-grid a.project-image[href]')];
  const cleanups = cards.map(card => {
    const note = document.createElement('span');
    note.className = 'project-hover-note';
    note.setAttribute('aria-hidden', 'true');
    document.body.append(note);
    let timers = [], active = false, pointerX = 0, pointerY = 0;
    function reset() {
      active = false;
      timers.forEach(clearTimeout); timers = [];
      note.classList.remove('is-visible');
    }
    function position() {
      if (!active) return;
      const x = pointerX + 14 + note.offsetWidth > innerWidth - 18 ? pointerX - note.offsetWidth - 14 : pointerX + 14;
      const y = pointerY + 18 + note.offsetHeight > innerHeight - 18 ? pointerY - note.offsetHeight - 14 : pointerY + 18;
      note.style.left = `${Math.max(18, x)}px`;
      note.style.top = `${Math.max(18, y)}px`;
    }
    function move(event) {
      pointerX = event.clientX; pointerY = event.clientY;
      position();
    }
    function show(text) {
      if (!active || !card.isConnected || !card.matches(':hover')) return reset();
      note.textContent = text;
      position(); note.classList.add('is-visible');
    }
    function enter(event) {
      reset();
      if (!capability.matches || event.pointerType !== 'mouse' || document.activeElement === card) return;
      active = true;
      move(event);
      timers = [setTimeout(() => show('You can click it.'), 4000), setTimeout(() => {
        if (!active) return;
        note.classList.remove('is-visible');
        timers.push(setTimeout(() => show('Still here.'), 180));
      }, 8000)];
    }
    card.addEventListener('pointerenter', enter);
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointerdown', reset);
    card.addEventListener('focus', reset);
    addEventListener('scroll', reset, {passive:true});
    addEventListener('resize', reset);
    capability.addEventListener('change', reset);
    const observer = new MutationObserver(() => { if (!card.isConnected || !card.getClientRects().length) reset(); });
    observer.observe(document.querySelector('main'), {childList:true, subtree:true, attributes:true, attributeFilter:['hidden']});
    return () => {
      reset(); observer.disconnect(); note.remove();
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', reset);
      card.removeEventListener('pointerdown', reset); card.removeEventListener('focus', reset);
      removeEventListener('scroll', reset); removeEventListener('resize', reset);
      capability.removeEventListener('change', reset);
    };
  });
  addEventListener('pagehide', event => { if (!event.persisted) cleanups.forEach(cleanup => cleanup()); });
})();
