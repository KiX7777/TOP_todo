import controller, { Controller } from './controller.js';
import view from './view.js';
('use strict');

export let lists = [];
export class List {
  constructor(title, tasks) {
    this.title = title;
    this.tasks = [];
  }
}

const basicTodos = new List('Default');
lists.push(basicTodos);

export class Task {
  constructor(title, description, dueDate, priority, notes, list) {
    (this.title = title),
      (this.description = description),
      (this.dueDate = new Date(dueDate).toLocaleString()),
      (this.priority = priority),
      (this.notes = notes);
    this.isDone = false;
    this.list = list;
  }

  doTask() {
    this.isDone = true;
  }
}

const overlay = document.querySelector('.overlay');

const addTaskBtn = document.querySelector('.napraviTask');
const doTaskBtn = document.querySelector('.odradiTask');
const deleteTaskBtn = document.querySelector('.obrišiTask');

// ADD TASK

// addTaskBtn.addEventListener('click', () => {
//   const todo = createTask();
//   // console.log(todo);
//   basicTodos.tasks.push(todo);
//   console.log(basicTodos.tasks);
//   view.showTasks(basicTodos);
//   // overlay.style.display = 'block';
// });

//PRVO NAPRAVI LISTU

// controller.addTask('kiko');

// controller.doTaskBtn.addEventListener('click', () => {
//   for (let task of basicTodos.tasks) {
//     task.doTask();
//     console.log(task.isDone);
//   }
// });

// deleteTaskBtn.addEventListener('click', () => {
//   deleteTask();
//   console.log(basicTodos);
// });

// console.log(createTask());
// const brijanje = createTask(
//   'Brijanje',
//   'Obrijati se',
//   'January 7, 2023',
//   'high'
// );

// console.log(brijanje);

function startTask() {
  const createTaskModal = document.querySelectorAll('.createTaskModal');
  createTaskModal.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      view.createTaskPopup();
      controller.addTask();
    });
  });
}

const datum = document.querySelector('#duedate');
// console.log(datum.value);

function init() {
  view.showSidebar();
  controller.startCreatingList();
  // view.containerColor();
  controller.startCreatingTask();
  controller.addTask();
  controller.addList();
  startTask();

  // controller.startCreatingTask();
  // controller.addTask();
  // controller.editTask();
  // controller.doTask('taskContainer');
  // view.deleteTask();
}

init();

// controller.waitForElm('.taskCard').then((elm) => {
//   console.log('Element is ready');
//   console.log(elm.textContent);
//   view.editTask('taskContainer', lists);
// });
