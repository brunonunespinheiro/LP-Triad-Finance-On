// Script com correção para menu que fecha sozinho

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navbar = document.querySelector('.navbar');
    const faqHeaders = document.querySelectorAll('.faq-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Criar overlay para o menu mobile
    const createOverlay = () => {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            closeMenu();
        });
        
        return overlay;
    };

    const menuOverlay = createOverlay();

    // Abrir menu mobile
    const openMenu = () => {
        navbarMenu.classList.add('active');
        menuToggle.classList.add('active');
        menuOverlay.classList.add('active');
        body.style.overflow = 'hidden'; // Impedir rolagem quando menu estiver aberto
    };

    // Fechar menu mobile
    const closeMenu = () => {
        navbarMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = ''; // Restaurar rolagem
    };

    // Toggle menu mobile - CORRIGIDO
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Impedir comportamento padrão
            e.stopPropagation(); // Impedir propagação do evento
            
            if (navbarMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Fechar menu ao clicar em um link, mas apenas no mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                closeMenu();
            }
        });
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991 && navbarMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Remover o fechamento do menu ao rolar (possível causa do problema)
    /* 
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (navbarMenu.classList.contains('active')) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                closeMenu();
            }, 150);
        }
    });
    */

    // Navbar scroll effect com melhorias
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // FAQ accordion com animação melhorada
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            // Toggle current FAQ item
            const isActive = body.classList.contains('active');
            
            // Fechar todos primeiro
            faqHeaders.forEach(otherHeader => {
                const otherBody = otherHeader.nextElementSibling;
                const otherIcon = otherHeader.querySelector('i');
                
                otherBody.classList.remove('active');
                otherIcon.classList.remove('fa-chevron-up');
                otherIcon.classList.add('fa-chevron-down');
            });
            
            // Se não estava ativo antes, abrir o atual
            if (!isActive) {
                body.classList.add('active');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });

    // Smooth scrolling para links de âncora com offset ajustável
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajustar o offset com base no tamanho da tela
                const navbarHeight = navbar.offsetHeight;
                const mobileOffset = window.innerWidth < 768 ? 20 : 0;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight - mobileOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação ao rolar a página com opções melhoradas
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-row, .method-row, .stats-row, .testimonials-row, .experts-row, .bonus-row, .step-box, .card, .testimonial, .expert-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            const mobileOffset = window.innerWidth < 768 ? 100 : 150;
            
            if (elementPosition < screenPosition - mobileOffset) {
                element.classList.add('animated');
            }
        });
    };

    // Adicionar classe para elementos animados
    const style = document.createElement('style');
    style.textContent = `
        .section-row, .method-row, .stats-row, .testimonials-row, .experts-row, .bonus-row, .step-box, .card, .testimonial, .expert-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 300);

    // Listen for scroll events with debounce para melhor performance
    let scrollAnimationTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollAnimationTimeout);
        scrollAnimationTimeout = setTimeout(animateOnScroll, 10);
    });

    // Adicionar favicon dinamicamente se ainda não existir
    const addFavicon = () => {
        if (!document.querySelector("link[rel='icon']")) {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            link.href = 'favicon.png';
            document.head.appendChild(link);
        }
    };

    // Adicionar favicon
    addFavicon();

    // Countdown timer para oferta limitada com formatação melhorada
    const startCountdown = () => {
        const limitedOffer = document.querySelector('.limited-offer');
        
        if (limitedOffer) {
            // Set countdown para 48 horas
            let hours = 47;
            let minutes = 59;
            let seconds = 59;
            
            const updateCountdown = () => {
                // Formatação melhorada com ícones
                limitedOffer.innerHTML = `
                    <i class="fas fa-clock"></i> 
                    <span class="countdown-text">Oferta por tempo limitado: </span>
                    <strong class="countdown-time">${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s</strong>
                `;
                
                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        
                        if (hours > 0) {
                            hours--;
                        } else {
                            // Reset countdown quando chegar a zero
                            hours = 47;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                }
            };
            
            // Atualizar countdown a cada segundo
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    };

    // Iniciar countdown
    startCountdown();
});