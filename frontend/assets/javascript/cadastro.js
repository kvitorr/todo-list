    
    
    document.getElementById("buttonRegister").addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post('//localhost:5000/user', { name, email, password })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  