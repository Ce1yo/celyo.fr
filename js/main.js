// Initialisation des animations AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Animation smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gestion de la navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation des barres de progression des compétences
const animateProgressBars = () => {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const value = bar.getAttribute('aria-valuenow');
        bar.style.width = '0%';
        bar.style.transition = 'width 1s ease';
        setTimeout(() => {
            bar.style.width = `${value}%`;
        }, 100);
    });
};

// Observer pour les animations des barres de progression
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('#competences').querySelectorAll('.progress').forEach(progress => {
    observer.observe(progress);
});

// Animation du texte d'accueil
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Animation au chargement de la page
window.addEventListener('load', () => {
    const title = document.querySelector('#home h1');
    if (title) {
        typeWriter(title, title.textContent);
    }
});

// Validation du formulaire de contact
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Ajoutez ici votre logique de validation et d'envoi du formulaire
        alert('Message envoyé avec succès!');
        contactForm.reset();
    });
}

// Animation des projets au survol
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-overlay').style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-overlay').style.opacity = '0';
    });
});