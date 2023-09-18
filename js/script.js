let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {
    const todoInput = document.getElementById("todoInput");
    todos.push({ text: todoInput.value, completed: false, highlight: false });
    todoInput.value = "";
    updateTodos();
}

function highlightEven() {
    todos.forEach((todo, index) => {
        if (index % 2 === 1) {
            todo.highlight = !todo.highlight;
        }
    });
    updateTodos();
}

function highlightOdd() {
    todos.forEach((todo, index) => {
        if (index % 2 === 0) {
            todo.highlight = !todo.highlight;
        }
    });
    updateTodos();
}

function removeLast() {
    todos.pop();
    updateTodos();
}

function removeFirst() {
    todos.shift();
    updateTodos();
}

function completeTodo(index) {
    const completedTodo = todos.splice(index, 1)[0];
    completedTodo.completed = true;
    todos.push(completedTodo);
    updateTodos();
}

function removeTodo(index) {
    todos.splice(index, 1);
    updateTodos();
}

function updateTodos() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("todo-item");
        if (todo.completed) {
            listItem.classList.add("completed");
        }
        if (todo.highlight) {
            listItem.classList.add("highlight");
        }

        const text = document.createElement("span");
        text.classList.add("todo-text");
        text.textContent = todo.text;
        listItem.appendChild(text);

        const actions = document.createElement("div");
        actions.classList.add("todo-actions");
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => {
            completeTodo(index);
            completeButton.disabled = true;
        };
        if (todo.completed) {
            completeButton.disabled = true;
        }
        actions.appendChild(completeButton);
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove");
        removeButton.onclick = () => removeTodo(index);
        actions.appendChild(removeButton);
        listItem.appendChild(actions);

        todoList.appendChild(listItem);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

updateTodos();
