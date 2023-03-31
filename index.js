window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.querySelector("#name");
    const newTodoForm = document.querySelector("#create-new-todo");

    const username = localStorage.getItem("username") || "";

    nameInput.value = username;

    nameInput.addEventListener("change", (e) => {
        localStorage.setItem("username", e.target.value);
    });

    newTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e.target.elements.content, e.target.elements.category);

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime(),
        };

        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));

        e.target.reset();

        displayTodos();
    });

    displayTodos();
});

const createTodo = (todo) => {
    const todoItem = document.createElement("div");
    const baseClass = "list__item";
    todoItem.classList.add(baseClass);

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    const content = document.createElement("div");
    const actions = document.createElement("div");

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    const bubbleVariant = todo.category == "personal" ? "personal" : "business";
    span.classList.add(bubbleVariant);

    content.classList.add(baseClass + "__content");
    actions.classList.add(baseClass + "__actions");
    editButton.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly /> `;
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.append(editButton);
    actions.append(deleteButton);
    todoItem.append(label);
    todoItem.append(content);
    todoItem.append(actions);

    if (todo.done) {
        todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
        todo.done = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todos));

        if (todo.done) {
            todoItem.classList.add("done");
        } else {
            todoItem.classList.remove("done");
        }

        displayTodos();
    });

    editButton.addEventListener("click", (e) => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();

        input.addEventListener("blur", (e) => {
            input.setAttribute("readonly", true);
            todo.content = e.target.value;
            localStorage.setItem("todos", JSON.stringify(todos));
            displayTodos();
        });
    });

    deleteButton.addEventListener("click", (e) => {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
    });

    return todoItem;
};

function displayTodos() {
    const todoList = document.querySelector("#todo-list");

    todoList.innerHTML = "";

    todos.forEach((todo) => {
        const newTodo = createTodo(todo);
        todoList.append(newTodo);
    });
}
