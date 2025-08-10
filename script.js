document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    siteNav.classList.toggle('open');
  });

  // SMOOTH SCROLL for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        // close nav on mobile
        if(siteNav.classList.contains('open')){
          siteNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // FORM VALIDATION
  const form = document.getElementById('contactForm');
  const feedback = document.querySelector('.form-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();

    if(!name){ return showError('Fill your name'); }
    if(!/^[\+0-9\s\-()]{7,}$/.test(phone)){ return showError('Phone looks wrong'); }
    if(!/^\S+@\S+\.\S+$/.test(email)){ return showError('Email looks wrong'); }

    // success
    feedback.textContent = 'Thanks! Form is accepted (demo).';
    feedback.style.color = 'green';

    // send via fetch to API if available
    form.reset();
    setTimeout(()=> feedback.textContent = '', 4000);
  });

  function showError(msg){
    feedback.textContent = msg;
    feedback.style.color = 'red';
  }

  // INTERSECTION OBSERVER
  const elements = document.querySelectorAll('.fade-in');
  if(elements.length){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  }
});
