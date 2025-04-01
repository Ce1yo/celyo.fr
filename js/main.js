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

// Animation des barres de progression
const progressBars = document.querySelectorAll('.progress-bar');

const animateProgressBar = (progressBar) => {
    const width = progressBar.getAttribute('aria-valuenow') + '%';
    progressBar.style.setProperty('--width', width);
    progressBar.classList.add('animate');
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBar(entry.target);
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

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

// Gestion des modales avec swipe sur mobile
document.querySelectorAll('.modal').forEach(modal => {
    let touchStart = 0;
    let touchEnd = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStart = e.changedTouches[0].screenY;
    }, false);

    modal.addEventListener('touchend', (e) => {
        touchEnd = e.changedTouches[0].screenY;
        if (touchEnd - touchStart > 50) {  // Si swipe vers le bas de plus de 50px
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        }
    }, false);

    // Fermeture au clic en dehors du modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        }
    });
});

// Popup notification et gestion de l'image flottante
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup-notification');
    const floatingImage = document.querySelector('.floating-image');
    let popupTimeout;

    // Fonction pour afficher le popup
    function showPopup() {
        if (window.innerWidth > 480 && (floatingImage.style.right === '20px' || floatingImage.style.right === '10px')) {
            popup.classList.remove('hide');
            popup.classList.add('show');
            
            // Cacher le popup après 5 secondes
            clearTimeout(popupTimeout);
            popupTimeout = setTimeout(() => {
                hidePopup();
            }, 5000);
        }
    }

    // Fonction pour cacher le popup
    function hidePopup() {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.classList.add('hide');
        }, 400);
    }

    // Afficher l'image après un délai
    setTimeout(function() {
        if (window.innerWidth <= 480) {
            floatingImage.style.right = '10px';
        } else {
            floatingImage.style.right = '20px';
        }
    }, 500);

    // Afficher le popup après un court délai au chargement (seulement sur desktop)
    if (window.innerWidth > 480) {
        setTimeout(showPopup, 1500);
    }

    // Gérer le scroll
    window.addEventListener('scroll', function() {
        const homeSection = document.getElementById('home');
        const homeSectionBottom = homeSection.getBoundingClientRect().bottom;
        
        if (homeSectionBottom <= 0) {
            floatingImage.style.right = '-200px';
            hidePopup();
        } else {
            if (window.innerWidth <= 480) {
                floatingImage.style.right = '10px';
            } else {
                floatingImage.style.right = '20px';
            }
        }
    });

    // Afficher le popup au clic sur l'image (seulement sur desktop)
    floatingImage.addEventListener('click', () => {
        if (window.innerWidth > 480 && popup.classList.contains('hide')) {
            showPopup();
        }
    });
});
