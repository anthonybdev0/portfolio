// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
if(toggle){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';
