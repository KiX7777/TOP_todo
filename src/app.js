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

    lists.forEach((list) => {
      let ime = list.title.trim();
      let novaLista = new List(ime);
      // lists.push(novaLista);
      view.hideListPopup();
      view.createListCard(novaLista);
      let lista = lists.find((item) => item.title === ime);
      let index = lists.indexOf(lista);

      view.doTask('taskContainer', lists);

      lista.tasks.forEach((task) => {
        view.createTaskCard(task);
        view.removeCard('taskContainer', lists);
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
  // controller.startCreatingTask();
  controller.addTask();
  controller.addList();
  startTask();
}

load();
