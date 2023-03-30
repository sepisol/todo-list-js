
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todoss");
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todoInput.value}</li>
    <span><i class="fas fa-check"></i></span>
    <span><i class="fas fa-trash"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value = "";
}
function checkRemove(event) {
    const classList = [...event.target.classList];
    const item = event.target;
    if (classList[1] === "fa-check") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed")
    } else if (classList[1] === "fa-trash") {
        const todo = item.parentElement.parentElement;
        todo.remove();
        removeLocalTodos(todo);
    }
}
function filterTodos(event) {
    const todos = [...todoList.childNodes];

    todos.forEach((todo) => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
function saveLocalTodos(todo) {
    let savedTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}
function getLocalTodos() {
    let savedTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = `
    <li>${todo}</li>
    <span><i class="fas fa-check"></i></span>
    <span><i class="fas fa-trash"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    });

}
function removeLocalTodos(todo) {
    let savedTodos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    const filteredTodos = savedTodos.filter(
        (t) => t !== todo.children[0].innerText
    );
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
}