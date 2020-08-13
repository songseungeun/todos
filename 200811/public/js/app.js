let todos = [];

let view = [];
let state = "all";

const $todos = document.querySelector(".todos");
const $inputTodo = document.querySelector(".input-todo");
const $completeAllCheckbox = document.getElementById("ck-complete-all");
const $completedTodos = document.querySelector(".completed-todos");
const $activeTodos = document.querySelector(".active-todos");
const $clearCompletedBtn = document.querySelector(".clear-completed > .btn");
const $nav = document.querySelector(".nav");

const completedTodos = () => todos.filter((todo) => todo.complete);
const activeTodos = () => todos.filter((todo) => !todo.complete);

const selectMenu = ({ target }) => {
  if (!target.matches(".nav > li")) return;

  [...$nav.children].map(($menu) =>
    $menu.classList.toggle("active", $menu === target)
  );

  state = target.id;
  render();
};

const countCompletedTodos = () =>
  ($completedTodos.textContent = completedTodos().length);

const countActiveTodos = () =>
  ($activeTodos.textContent = activeTodos().length);

const render = () => {
  let html = "";

  if (state === "all") view = todos;
  else if (state === "active") view = activeTodos();
  else if (state === "completed") view = completedTodos();

  view.map(({ id, contents, complete }) => {
    html += `
      <li id=${id} class="todo-item">
        <input id="ck-${id}" class="checkbox" type="checkbox"${
      complete ? "checked" : ""
    }>
        <label for="ck-${id}">${contents}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>
      `;
  });

  $todos.innerHTML = html;

  countCompletedTodos();
  countActiveTodos();
};

render();

const createId = () =>
  todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

const onCreate = ({ target, key }) => {
  if (key !== "Enter" || target.value.trim() === "") return;

  let newTodo = { id: createId(), contents: target.value, complete: false };
  todos = [newTodo, ...todos];

  target.value = "";

  render();
};

const checkCompleteMark = () => {};

const onChange = ({ target }) => {
  todos = todos.map((todo) =>
    todo.id === +target.parentNode.id
      ? { ...todo, complete: !todo.complete }
      : todo
  );

  checkCompleteMark();
  render();
};

const removeTodo = ({ target }) => {
  if (!target.matches(".remove-todo")) return;
  todos = todos.filter((todo) => todo.id !== +target.parentNode.id);
  render();
};

const completeAll = ({ target }) => {
  todos = todos.map((todo) => ({ ...todo, complete: target.checked }));
  render();
};

const clearCompletedTodos = ({ target }) => {
  todos = activeTodos();
  render();
};

$nav.addEventListener("click", selectMenu);

$inputTodo.addEventListener("keyup", onCreate);
$todos.addEventListener("change", onChange);
$todos.addEventListener("click", removeTodo);

$completeAllCheckbox.addEventListener("change", completeAll);
$clearCompletedBtn.addEventListener("click", clearCompletedTodos);
