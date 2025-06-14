document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const nascimento = document.getElementById('nascimento').value;
  const senha = document.getElementById('senha').value;
  const confirmar = document.getElementById('confirmarSenha').value;

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(email)){
    return alert("Formato do Email invalido")
  }

  if (cpf.length !== 11) {
    return alert("Formato do CPF esta errado");
  }

  if (senha !== confirmar) {
    return alert("As senhas não são iguais");
  }

  try {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, nome, cpf, nascimento, senha })
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = 'login.html';
    } else {
      alert("Houve uma falha ao relizar seu registro");
    }
  } catch (err) {
    alert("Houve uma falha ao relizar seu registro");
  }
});