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

const basicTodos = new List('Basic');

export class Task {
  constructor(title, description, dueDate, priority, notes) {
    (this.title = title),
      (this.description = description),
      (this.dueDate = new Date(dueDate).toLocaleString()),
      (this.priority = priority),
      (this.notes = notes);
    this.isDone = false;
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

const datum = document.querySelector('#duedate');
// console.log(datum.value);

function init() {
  controller.startCreatingList();
  controller.startCreatingTask();
  controller.addList();
  controller.addTask();
  // controller.doTask();
  // view.deleteTask();
}

init();
