// State
let todos = [];
let navState = 'all';

// DOM
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');

// nav
const $nav = document.querySelector('.nav');

// footer
const $completeAll = document.querySelector('.complete-all');
const $clearCompleted = document.querySelector('.clear-completed');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');


const render = () => {
  let html = '';

  const _todos = todos.filter(({ completed }) => (navState === 'active' ? !completed : (navState === 'completed' ? completed : true)));

  _todos.forEach(({ id, content, completed }) => {
    html += `
    <li id="${id}" class="todo-item">
      <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>
    `;
  });

  $todos.innerHTML = html;

  $completedTodos.innerHTML = todos.filter(todo => todo.completed).length;
  $activeTodos.innerHTML = todos.filter(todo => !todo.completed).length;
};

const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'Javascript', completed: false },
    { id: 3, content: 'CSS', completed: false }
  ].sort((todoA, todoB) => todoB.id - todoA.id);

  render();
};

const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

window.onload = getTodos;

$inputTodo.onkeyup = (e) => {
  if (e.keyCode !== 13) return;
  todos = [{ id: generateId(), content: $inputTodo.value, completed: false }, ...todos];
  e.target.value = '';

  render();
};

$nav.onclick = ({ target }) => {
  if (!target.matches('.nav > li')) return;
  navState = target.id;
  [...$nav.children].forEach(navItem => navItem.classList.toggle('active', navItem.id === target.id));

  render();
};

$todos.onchange = ({ target }) => {
  const todoId = target.parentNode.id;
  todos = todos.map(todo => (todo.id === +todoId ? { ...todo, completed: !todo.completed } : todo));

  render();
};

$todos.onclick = ({ target }) => {
  const todoId = target.parentNode.id;
  if (!target.matches('.todos > li > i.remove-todo')) return;
  todos = todos.filter((todo) => todo.id !== +todoId);

  render();
};

$completeAll.onchange = ({ target }) => {
  todos = todos.map(todo => ({ ...todo, completed: target.checked }));
  render();
};

$clearCompleted.onclick = ({ target }) => {
  if (!target.matches('.clear-completed > button.btn')) return;
  todos = todos.filter(todo => !todo.completed);

  render();
};
