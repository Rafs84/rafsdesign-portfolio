(() => {
  const form = document.querySelector('.contact-form');
  const siteKey = document.querySelector('meta[name="recaptcha-site-key"]')?.content;
  // Preserve working hosted CAPTCHA until a site-specific key is configured.
  if (!form || !siteKey) return;
  const button = form.querySelector('[type="submit"]');
  const status = form.querySelector('.contact-status');
  const again = form.querySelector('.contact-again');
  const captcha = form.querySelector('.contact-captcha');
  const fields = [...form.querySelectorAll('input, textarea')];
  const receiptKey = 'rafs-contact-sent';
  let widget, sending = false, sent = false;
  function receipt() {
    sent = true;
    form.reset();
    fields.forEach(field => { field.disabled = true; });
    button.textContent = 'Message sent';
    button.disabled = true;
    status.textContent = 'Thanks for getting in touch. Your message has been sent.';
    captcha.hidden = true;
    again.hidden = false;
  }
  try { if (sessionStorage.getItem(receiptKey)) receipt(); } catch {}
  button.disabled = true;
  if (!sent) status.textContent = 'Loading verification…';
  const load = document.createElement('script');
  window.rafsContactCaptchaReady = () => {
    widget = grecaptcha.render(captcha, {
      sitekey:siteKey,
      size:'compact',
      callback:() => { if (!sending && !sent) button.disabled = false; },
      'expired-callback':() => { button.disabled = true; },
      'error-callback':() => {
        button.disabled = true;
        status.textContent = 'Verification couldn’t load. Please refresh and try again.';
      }
    });
    if (!sent) status.textContent = 'Complete the verification, then send your message.';
  };
  load.src = 'https://www.google.com/recaptcha/api.js?onload=rafsContactCaptchaReady&render=explicit';
  load.async = true;
  load.onerror = () => { status.textContent = 'Verification couldn’t load. Please refresh and try again.'; };
  document.head.append(load);
  again.addEventListener('click', () => {
    sent = false;
    try { sessionStorage.removeItem(receiptKey); } catch {}
    fields.forEach(field => { field.disabled = false; });
    button.textContent = 'Send message';
    button.disabled = true;
    again.hidden = true;
    captcha.hidden = false;
    if (widget !== undefined) grecaptcha.reset(widget);
    status.textContent = 'Complete the verification, then send your message.';
    fields[0].focus();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || sent) return;
    const token = widget === undefined ? '' : grecaptcha.getResponse(widget);
    if (!token) { status.textContent = 'Please complete the verification first.'; return; }
    sending = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message…';
    const data = new FormData(form);
    data.set('g-recaptcha-response', token);
    try {
      const response = await fetch(form.action, {method:'POST', body:data, headers:{Accept:'application/json'}});
      if (!response.ok) throw new Error('Submission rejected');
      try { sessionStorage.setItem(receiptKey, '1'); } catch {}
      receipt();
    } catch {
      button.textContent = 'Send message';
      button.disabled = true;
      status.textContent = 'We couldn’t confirm your message was sent. Your text is still here. Please verify again before retrying.';
      grecaptcha.reset(widget);
    } finally {
      sending = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
