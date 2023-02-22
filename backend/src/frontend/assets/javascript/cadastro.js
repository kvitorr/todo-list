   
document.getElementById("buttonRegister").addEventListener("click", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(name, email, password)

  axios.post('http://localhost:5500/cadastro', {name, email, password})
  window.location.href = 'http://127.0.0.1:5500/src/frontend/login.html'

});

  