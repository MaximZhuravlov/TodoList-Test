const todoInput = document.querySelector('.todo-input');
const addTodoButton = document.querySelector('.add-todo-button');
const todoList = document.querySelector('.todo-list');
const filterTodos = document.querySelector('.filter-todos');

// Retrieve data from the local storage
if (localStorage.getItem('todos')) {
  const todosFromStorage = JSON.parse(localStorage.getItem('todos'));
  todosFromStorage.forEach(todo => addTodo(todo));
}

addTodoButton.addEventListener('click', function(event) {
  event.preventDefault();

  const todo = todoInput.value;

  if (todo.trim() !== '') {
    addTodo(todo);
    saveToLocalStorage(todo);
  }

  todoInput.value = '';
});

todoList.addEventListener('click', function(event) {
  const target = event.target;

  if (target.closest('.delete-button')) {
    target.closest('.todo').remove();
    removeFromLocalStorage(target.closest('.todo').querySelector('.todo-text').textContent);
  }

  if (target.closest('.complete-button')) {
    target.closest('.todo').classList.toggle('todo-completed');
  }
});

function addTodo(todo) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('p');
  newTodo.classList.add('todo-text');
  const todoText = document.createTextNode(todo);
  newTodo.appendChild(todoText);
  todoDiv.appendChild(newTodo);

  const completeButton = document.createElement('button');
  completeButton.insertAdjacentHTML('afterbegin',
    '<i class="fas fa-check"></i>');
    completeButton.classList.add('complete-button');
  todoDiv.appendChild(completeButton);

  const deleteButton = document.createElement('button');
  deleteButton.insertAdjacentHTML('afterbegin',
  '<i class="fas fa-trash"></i>');
  deleteButton.classList.add('delete-button');
  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);
}

function saveToLocalStorage(todo) {
  const todos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];
  
  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocalStorage(todo) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const index = todos.findIndex(item => item === todo);
  todos.splice(index, 1);

  if (todos.length !== 0) {
    localStorage.setItem('todos', JSON.stringify(todos));
  } else {
    localStorage.clear();
  }
}