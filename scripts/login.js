document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = 'preferences.html';
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Houve um erro ao realizar o login");
  }
});