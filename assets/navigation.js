(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const toggle = nav.querySelector('.nav-toggle');
  const links = nav.querySelector('.nav-links');
  const mobile = matchMedia('(max-width:600px)');
  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  nav.classList.add('nav-ready');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target)) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      close(); toggle.focus();
    }
  });
  nav.addEventListener('focusout', event => { if (!nav.contains(event.relatedTarget)) close(); });
  mobile.addEventListener('change', close);
  // Homepage section indicators follow the section currently in view.
  const sections = ['approach', 'about'].map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;
  const sectionLinks = [...links.querySelectorAll('a')].filter(a => sections.some(s => a.hash === '#' + s.id));
  const update = () => {
    const boundary = document.querySelector('header').getBoundingClientRect().bottom + 48;
    const current = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= boundary && rect.bottom > boundary;
    });
    sectionLinks.forEach(link => {
      if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let scheduled = false;
  addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; update(); });
  }, {passive:true});
  addEventListener('resize', update);
  update();
})();
