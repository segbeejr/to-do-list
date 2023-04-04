let todos = [];

const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const searchInput = document.querySelector("#searchInput");

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
  }
}

function deleteTodoById(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function editTodoById(id, newText) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.text = newText;
    }
    return todo;
  });
  saveTodos();
  renderTodos();
}

function toggleTodoById(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todosString = localStorage.getItem("todos");
  if (todosString) {
    todos = JSON.parse(todosString);
  }
  renderTodos();
}

function renderTodos() {
  let filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  todoList.innerHTML = "";
  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.classList.add("completed");
    }
    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.textContent = "Delete";
    todoDeleteButton.addEventListener("click", () =>
      deleteTodoById(todo.id)
    );
    const todoEditButton = document.createElement("button");
    todoEditButton.textContent = "Edit";
    todoEditButton.addEventListener("click", () => {
      const input = document.createElement("input");
      input.value = todo.text;
      todoItem.replaceChild(input, todoText);
      input.focus();
      input.addEventListener("blur", () =>
        editTodoById(todo.id, input.value)
      );
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          editTodoById(todo.id, input.value);
          todoItem.replaceChild(todoText, input);
        } else if (event.key === "Escape") {
              todoItem.replaceChild(todoText, input);
          }
          });
      });
          
          const todoToggleCheckbox = document.createElement("input");
          todoToggleCheckbox.type = "checkbox";
          todoToggleCheckbox.checked = todo.completed;
          todoToggleCheckbox.addEventListener("change", () =>
              toggleTodoById(todo.id)
          );
          todoItem.appendChild(todoToggleCheckbox);
          todoItem.appendChild(todoText);
          todoItem.appendChild(todoDeleteButton);
          todoItem.appendChild(todoEditButton);
          todoList.appendChild(todoItem);
          });
      }

          todoForm.addEventListener("submit", (event) => {
          event.preventDefault();
          addTodo();
      });

          searchInput.addEventListener("input", () => {
          renderTodos();
      });

          loadTodos();