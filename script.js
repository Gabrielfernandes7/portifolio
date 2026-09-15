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
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
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
