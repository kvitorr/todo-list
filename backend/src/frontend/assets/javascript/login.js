
document.getElementById("buttonLogin").addEventListener("click", async (event) => {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    await axios.post('http://localhost:5500/login', {email, password})

    
    const response = await axios.get(`http://localhost:5500/user/${email}`)
    const name = response.data.name

    console.log(name)
    localStorage.setItem("name", name);
    window.location.href = 'http://127.0.0.1:5500/src/frontend/todo.html'
  
  });