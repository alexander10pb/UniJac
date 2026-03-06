export function initEmailValidator() {
    const emailInput = document.querySelector('#emailInput');
    if (!emailInput) return;

    emailInput.addEventListener('input', (e) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(e.target.value)) {
            e.target.setCustomValidity('');
            e.target.style.border = '2px solid green';
        } else {
            e.target.setCustomValidity('Email inválido');
            e.target.style.border = '2px solid red';
        }
    });
}