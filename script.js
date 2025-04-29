// Script com correção para menu que fecha sozinho e modal de cadastro integrado

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
            
            // Verificar se é um link para #contact (para abrir modal)
            if (targetId === '#contact') {
                openContactModal();
                return;
            }
            
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
        
        /* Estilos para o Modal de Cadastro */
        .modal {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal.active {
            display: block;
            opacity: 1;
        }
        
        .modal-content {
            background: var(--darker);
            margin: 5% auto;
            width: 90%;
            max-width: 500px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            transform: translateY(-50px);
            opacity: 0;
            transition: all 0.4s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
        }
        
        .modal.active .modal-content {
            transform: translateY(0);
            opacity: 1;
        }
        
        .close-modal {
            position: absolute;
            right: 20px;
            top: 15px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1;
        }
        
        .close-modal:hover {
            color: var(--primary);
        }
        
        .modal-header {
            padding: 25px 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(18, 18, 18, 0.8));
        }
        
        .modal-header h3 {
            margin-bottom: 10px;
            font-size: 1.8rem;
            color: white;
        }
        
        .modal-header p {
            opacity: 0.8;
            margin-bottom: 0;
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--accent);
            font-size: 0.9rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px 15px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;
            font-family: 'Exo', sans-serif;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 3px rgba(11, 143, 68, 0.2);
        }
        
        .form-group input::placeholder,
        .form-group textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        
        .btn-full {
            width: 100%;
            padding: 15px;
            font-size: 1.1rem;
            margin-top: 10px;
        }
        
        .btn-dark-blue {
            background: #1a1a2e;
            color: white;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(26, 26, 46, 0.4);
            border: none;
            transition: all 0.3s ease;
        }
        
        .btn-dark-blue:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(26, 26, 46, 0.6);
            background: #252547;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 10% auto;
            }
            
            .modal-header {
                padding: 20px;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-header h3 {
                font-size: 1.5rem;
            }
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

    // ======= MODAL DE CADASTRO ========

// Apenas a função de criação do modal ajustada

// Criar e adicionar o modal ao body
const createModal = () => {
    const modalHTML = `
    <div id="cadastro-modal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h3>Garantir Minha Vaga</h3>
                <p>Preencha o formulário abaixo para garantir seu diagnóstico financeiro gratuito.</p>
            </div>
            <div class="modal-body">
                <form id="form-cadastro">
                    <div class="form-group">
                        <label for="nome">Nome completo</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo">
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu melhor e-mail">
                    </div>
                    <div class="form-group">
                        <label for="telefone">WhatsApp</label>
                        <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000">
                    </div>
                    <div class="form-group">
                        <label for="empresa">Nome da empresa</label>
                        <input type="text" id="empresa" name="empresa" placeholder="Digite o nome da sua empresa">
                    </div>
                    <div class="form-group">
                        <label for="desafio">Qual o maior desafio financeiro da sua empresa?</label>
                        <textarea id="desafio" name="desafio" rows="3" placeholder="Conte-nos sobre o seu desafio"></textarea>
                    </div>
                    <button type="submit" class="btn-primary btn-dark-blue btn-full">
                        <i class="fas fa-paper-plane"></i> Enviar e garantir minha vaga
                    </button>
                </form>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};
    
// Criar o modal e, só então, configurar tudo relacionado a ele
createModal();

// Referenciar os elementos do modal **somente depois** que eles existirem no DOM
const modal = document.getElementById('cadastro-modal');
const closeBtn = modal.querySelector('.close-modal');
const form = modal.querySelector('#form-cadastro');

// Função para abrir o modal
const openContactModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 50);
};

// Função para fechar o modal
const closeContactModal = () => {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-50px)';
    modalContent.style.opacity = '0';

    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
};

// Abrir modal com os CTAs
const ctaButtons = document.querySelectorAll('a[href="#contact"], a[href="#"].btn-primary, a[href="#"].btn-large');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        openContactModal();
    });
});

// Fechar com botão X
if (closeBtn) {
    closeBtn.addEventListener('click', closeContactModal);
}

// Fechar clicando fora
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeContactModal();
    }
});

// Fechar com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeContactModal();
    }
});

// Máscara de telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            }
            if (value.length > 10) {
                value = `${value.substring(0, 10)}-${value.substring(10)}`;
            }
            e.target.value = value;
        }
    });
}

// Enviar formulário para WhatsApp
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const desafio = document.getElementById('desafio').value.trim();
    
        const numeroWhatsapp = "5599991500415";
        let mensagem = `Olá! Quero garantir minha vaga para o diagnóstico financeiro grátis.\n\n`;
        mensagem += `*Nome:* ${nome}\n`;
        mensagem += `*E-mail:* ${email}\n`;
        mensagem += `*Telefone:* ${telefone}\n`;
        mensagem += `*Empresa:* ${empresa}\n`;
        mensagem += `*Desafio financeiro:* ${desafio}\n\n`;
        mensagem += `Aguardo contato. Obrigado!`;
    
        // Primeiro abrir o WhatsApp
        const whatsappUrl = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappUrl, '_blank');
    
        // Depois fechar modal e limpar o formulário
        closeContactModal();
        form.reset();
    });
    
}

});
