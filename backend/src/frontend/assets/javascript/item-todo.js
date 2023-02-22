import { isEven } from "./utils.js"

const todoList = document.getElementById('todos')
const buttonAddNewTodo = document.getElementById('button-add')

buttonAddNewTodo.addEventListener('click', () => {
    const description = document.getElementById('description')
    let listQuantity = Number(document.querySelectorAll("li").length) + 1
    let backgroundColor = 'list-todos-color'

    if(isEven(listQuantity)) backgroundColor = 'list-todos-color2'

    todoList.innerHTML += `
        <li>
            <div class="list-todos grid-content ${backgroundColor}">
                <p>${listQuantity}</p>
                <p>1</p>
                <p class="description">${description.value}</p>
                <div>
                    <img src="" alt="">
                </div>
            </div>
        </li>
    `

})