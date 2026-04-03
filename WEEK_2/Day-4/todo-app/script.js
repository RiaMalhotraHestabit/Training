const todoText = document.getElementById("todoText");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list")
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "todo-item";

        const span = document.createElement("span");
        span.textContent = todo;

        const editbtn = document.createElement("button");
        editbtn.textContent = "Edit";

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";

        editbtn.addEventListener("click", () => {
            const updatedTodo = prompt("Edit todo:", todo);
            if (!updatedTodo || updatedTodo.trim() === "") return;

            todos[index] = updatedTodo.trim();
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos();
        });

        deletebtn.addEventListener("click", () => {
            deleteTodo(index);
        });

        li.appendChild(span);
        li.appendChild(editbtn);
        li.appendChild(deletebtn);
        todoList.appendChild(li);
    });
}


function addTodo() {
    try {
        const value = todoText.value.trim();
        if (value === "") return;

        todos.push(value);
        localStorage.setItem("todos", JSON.stringify(todos));

        todoText.value = ""; 

        renderTodos();
    } catch (error) {
        console.error(error);
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

addBtn.addEventListener("click", addTodo); //event listener for add button
todoText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});


renderTodos(); //without this, stored todos won't show on refresh;

