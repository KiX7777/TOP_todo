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

let basicTodos = new List('Default');
// lists.push(basicTodos);

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

function start(list) {
  // lists = list;
  console.log(list);
  console.log(lists);
}

function getLocal() {
  if (localStorage.getItem('Lists') === null) {
    console.log('no storage');
    return;
  } else {
    let item = localStorage.getItem('Lists');
    let data = JSON.parse(item);
    return data;
  }
}

function load() {
  if (localStorage.getItem('Lists') === null) {
    let novaLista = new List('Default');
    lists.push(novaLista);
    view.createListCard(novaLista);
    controller.saveLocal();
    init();
  } else {
    let cache = JSON.parse(localStorage.getItem('Lists'));
    lists = cache;
    console.log(cache, lists);
    // view.renderStarting();

    lists.forEach((list) => {
      let ime = list.title.trim();
      let novaLista = new List(ime);
      // lists.push(novaLista);
      console.log(lists);
      view.hideListPopup();
      view.createListCard(novaLista);
      let lista = lists.find((item) => item.title === ime);
      let index = lists.indexOf(lista);
      console.log(lista, index);

      lista.tasks.forEach((task) => {
        console.log(task);

        view.createTaskCard(task);
      });

      //DEFAULT SE UČITAVA
      document.querySelectorAll('.taskContainer').forEach((container) => {
        container.style.display = 'none';
        container.classList.remove('active');
      });
      document.querySelector('.Default').style.display = 'flex';
      document.querySelector('.Default').classList.add('active');
    });

    init();
    view.toggleTaskLists();
    view.removeCard('listsContainer', lists);
    view.removeCard('taskContainer', lists);
    view.doTask('taskContainer', lists);
    view.editTask('taskCard', lists);
  }
}

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
  controller.addTask();
  controller.addList();
  startTask();
}

load();
