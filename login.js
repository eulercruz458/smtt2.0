const form = document.getElementById('loginForm');
const mensagemErro = document.getElementById('mensagemErro');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const atendente = document.getElementById('atendente').value.trim();
  const senha = document.getElementById('senha').value;

  const atendentesValidos = ['Irandi', 'Celma', 'Winne', 'Filo', 'Vanessa', 'Euler', 'Solange'];
  const senhaValida = 'smtt1234';

  if (atendentesValidos.includes(atendente) && senha === senhaValida) {
    mensagemErro.textContent = '';
    localStorage.setItem('atendenteLogado', atendente); // para uso futuro
    alert('Login realizado com sucesso!');
    window.location.href = `https://formularioagendamento.netlify.app/?atendente=${encodeURIComponent(atendente)}`;
  } else {
    mensagemErro.textContent = 'Atendente ou senha inválidos!';
  }
});
