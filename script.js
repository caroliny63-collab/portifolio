
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuIcon = menuToggle.querySelector('i');

function toggleMenu() {
    const isExpanded = navLinks.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    if (isExpanded) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

menuToggle.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em qualquer link
const navLinksItems = document.querySelectorAll('.nav-link');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// Fechar menu ao redimensionar para desktop (evita estado inconsistente)
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }
});

// ===== EFEITO DE DIGITAÇÃO (ROTATIVO) =====
const roles = [
    "HTML",
    "CSS",
    "JavaScript",
    
];
let roleIndex = 0;
const dynamicRoleElement = document.getElementById('dynamicRole');

function changeRole() {
    if (!dynamicRoleElement) return;
    roleIndex = (roleIndex + 1) % roles.length;
    dynamicRoleElement.style.opacity = '0';
    setTimeout(() => {
        dynamicRoleElement.textContent = roles[roleIndex];
        dynamicRoleElement.style.opacity = '1';
    }, 150);
}

if (dynamicRoleElement) {
    dynamicRoleElement.style.transition = 'opacity 0.2s ease';
    setInterval(changeRole, 2800);
}

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validação simples
    if (!name || !email || !message) {
        showFeedback('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFeedback('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // Simula envio (apenas demonstração)
    showFeedback('Enviando mensagem...', 'info');
    
    setTimeout(() => {
        showFeedback('Mensagem enviada com sucesso! Em breve entrarei em contato. ✨', 'success');
        contactForm.reset();
    }, 800);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return emailRegex.test(email);
}

function showFeedback(msg, type) {
    formFeedback.textContent = msg;
    formFeedback.className = 'form-feedback';
    if (type === 'success') {
        formFeedback.classList.add('success');
    } else if (type === 'error') {
        formFeedback.classList.add('error');
    } else if (type === 'info') {
        formFeedback.style.color = '#6366f1';
    }
    setTimeout(() => {
        if (formFeedback.textContent === msg) {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
        }
    }, 4000);
}

// ===== ANO ATUAL NO FOOTER =====
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ===== SMOOTH SCROLL PARA LINKS (garantia extra) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PREVENIR CLIQUE EM LINKS VAZIOS (DEMO/CODIGO) MOSTRAR ALERTA =====
const demoLinks = document.querySelectorAll('.card-links .link-icon');
demoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            showFeedback('Link demonstrativo – repositório em breve.', 'info');
        }
    });
});