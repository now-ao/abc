// Atualiza a data dinamicamente
const meses = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];
const dias = [
  "domingo", "segunda-feira", "terça-feira", "quarta-feira",
  "quinta-feira", "sexta-feira", "sábado"
];
const agora = new Date();
document.getElementById('date').textContent =
  `${dias[agora.getDay()]}, ${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}`;

// Função copiar IBAN com feedback visual
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const iban = btn.getAttribute('data-iban');
    navigator.clipboard.writeText(iban).then(() => {
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1200);
    }).catch(() => alert('Erro ao copiar IBAN'));
  });
});

// Dropdown Menu Functionality
const moreBtn = document.getElementById('moreBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (moreBtn && dropdownMenu) {
  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== moreBtn) {
      dropdownMenu.classList.remove('show');
    }
  });

  // Know More Button
  document.getElementById('knowMoreBtn')?.addEventListener('click', () => {
    alert('Mike L\'ange é o desenvolvedor por trás do MTelus. Entre em contato para mais informações!');
    dropdownMenu.classList.remove('show');
  });
}

// Função de navegação
function navigateTo(page) {
  window.location.href = page;
}