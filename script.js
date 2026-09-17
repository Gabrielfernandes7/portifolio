tailwind.config = {
    theme: {
        extend: {
            colors: {
                creme: {
                    50: '#FAF8F5',
                    100: '#F5F0E6',
                    200: '#EBE2D3',
                    300: '#DDD0BC',
                },
                oliva: {
                    50: '#F3F5F2',
                    100: '#E3E8E0',
                    200: '#C5D1C0',
                    400: '#7E9673',
                    600: '#4A5D43',
                    800: '#2D3A29',
                    900: '#1D261A',
                },
            },
            fontFamily: {
                heading: ['Plus Jakarta Sans', 'sans-serif'],
                body: ['DM Sans', 'sans-serif'],
            },
        },
    },
};

let selectedSiteType = '';

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Menu Mobile ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Lógica do Botão Flutuante do WhatsApp ---
    const floatingWhatsAppBtn = document.getElementById('floatingWhatsApp');
    if (floatingWhatsAppBtn) {
        function updateFloatingButtonVisibility() {
            const isMobile = window.innerWidth < 768;
            const hasScrolled = window.scrollY > 300;
            const orcamentoSection = document.getElementById('orcamento');
            const orcamentoBounds = orcamentoSection?.getBoundingClientRect();
            const inOrcamentoSection = orcamentoBounds &&
                orcamentoBounds.top < window.innerHeight &&
                orcamentoBounds.bottom > 0;

            if (isMobile && hasScrolled && !inOrcamentoSection) {
                floatingWhatsAppBtn.style.display = 'flex';
            } else {
                floatingWhatsAppBtn.style.display = 'none';
            }
        }

        window.addEventListener('scroll', updateFloatingButtonVisibility);
        window.addEventListener('resize', updateFloatingButtonVisibility);
        updateFloatingButtonVisibility();
    }

    // --- Lógica do Carrossel de Portfólio ---
    const carousel = document.getElementById('portfolioCarousel');
    const prevBtn = document.getElementById('portfolioPrev');
    const nextBtn = document.getElementById('portfolioNext');
    const dotsContainer = document.getElementById('portfolioDots');

    if (carousel && prevBtn && nextBtn && dotsContainer) {
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        if (slides.length > 0) {
            // Cria os indicadores (dots) dinamicamente
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('aria-label', `Ir para o projeto ${i + 1}`);
                dot.className = 'h-2 w-2 rounded-full bg-oliva-300 transition-all duration-300';
                dot.addEventListener('click', () => scrollToSlide(i));
                dotsContainer.appendChild(dot);
            });
            const dots = Array.from(dotsContainer.children);

            // Funções utilitárias
            const getGap = () => parseFloat(getComputedStyle(carousel).columnGap) || 24;
            const getStep = () => slides[0].offsetWidth + getGap();

            function scrollToSlide(index) {
                carousel.scrollTo({ left: index * getStep(), behavior: 'smooth' });
            }

            function getCurrentIndex() {
                return Math.round(carousel.scrollLeft / getStep());
            }

            // Atualiza o estado dos controles (setas e dots)
            function updateCarouselState() {
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                const x = carousel.scrollLeft;

                prevBtn.disabled = x < 4;
                nextBtn.disabled = x > maxScroll - 4;

                const currentIdx = getCurrentIndex();
                dots.forEach((dot, i) => {
                    const isActive = i === currentIdx;
                    dot.classList.toggle('bg-oliva-800', isActive);
                    dot.classList.toggle('w-6', isActive);
                    dot.classList.toggle('bg-oliva-300', !isActive);
                    dot.classList.toggle('w-2', !isActive);
                });
            }

            // Eventos das setas
            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -getStep(), behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: getStep(), behavior: 'smooth' });
            });

            // Evento de scroll (com otimização)
            let ticking = false;
            carousel.addEventListener('scroll', () => {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(() => {
                    updateCarouselState();
                    ticking = false;
                });
            }, { passive: true });

            // Evento de redimensionamento
            window.addEventListener('resize', updateCarouselState);

            // Navegação por teclado
            carousel.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextBtn.click();
                }
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevBtn.click();
                }
            });

            // Inicializa o estado
            updateCarouselState();
        }
    }
});

function closeMobileMenu() {
    document.getElementById('mobileMenu')?.classList.add('hidden');
}

function selectOption(category, value) {
    if (category !== 'siteType') {
        return;
    }

    selectedSiteType = value;
    const buttons = document.querySelectorAll('#siteTypeContainer .calc-btn');

    buttons.forEach((btn) => {
        btn.classList.remove('border-oliva-800', 'bg-oliva-100/50', 'ring-2', 'ring-oliva-600');

        if (btn.innerText.includes(value.split(' ')[0])) {
            btn.classList.add('border-oliva-800', 'bg-oliva-100/50', 'ring-2', 'ring-oliva-600');
        }
    });
}

function sendCalculatedBudget() {
    const clientName = document.getElementById('clientName')?.value.trim() || 'Não informado';
    const checkboxes = document.querySelectorAll('.feature-check:checked');
    const features = Array.from(checkboxes).map((cb) => cb.value).join(', ') || 'Padrão';
    const site = selectedSiteType || 'Site Personalizado';

    const message = `Olá Gabriel! Solicitação de Orçamento pelo Portfólio:
- Nome/Empresa: ${clientName}
- Tipo de Projeto: ${site}
- Recursos Desejados: ${features}

Gostaria de saber valores e disponibilidade de prazo!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5585985313082?text=${encodedMessage}`, '_blank');
}