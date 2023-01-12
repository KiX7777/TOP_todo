'use strict';

import { Task } from './app.js';
import { List } from './app.js';
import view from './view.js';
import { lists } from './app.js';

const createListModal = document.querySelector('.createListModal');
const confirmTaskCreation = document.querySelector('.addTask');
const confirmListCreation = document.querySelector('.addList');
const doTaskBtn = document.querySelector('.odradiTask');
const deleteTaskBtn = document.querySelector('.obrišiTask');
const datum = document.querySelector('#duedate');
const listContainer = document.querySelector('.listsContainer');
const deleteCardbtn = document.querySelector('.deleteCardbtn');

//INPUT VALUES SELECTORS

// const titleInput = document.querySelector('#title').value;
// const descriptionInput = document.querySelector('#description').value;
// const dateInput = document.querySelector('#duedate').value;
// const priorityInput = document.querySelector('#priority').value;
// const notesInput = document.querySelector('#notes').value;

export class Controller {
  createTask = (list) => {
    let taskTitle = title.value.trim();
    if (!taskTitle || !taskTitle.trim().length === 0) {
      alert('Task name cannot be empty!');
      return;
    } else {
      let taskDescription = description.value;
      let taskdueDate = duedate.value;

      let taskPriority = priority2.value;
      if (taskPriority === 'normal' || taskPriority === 'important') {
        let taskNotes = notes.value;
        return new Task(
          taskTitle,
          taskDescription,
          taskdueDate,
          taskPriority,
          taskNotes,
          list
        );
      } else {
        alert('Select priority');
        return;
      }
    }
  };

  createList() {
    let naziv = listName.value;
    let msg = document.querySelector('.invalidListMsg');
    if (!naziv || naziv.trim().length === 0) {
      msg.style.display = 'inline-block';
      // alert('INSERT CORRECT LIST NAME');
      listName.addEventListener('input', () => {
        msg.style.display = 'none';
      });
      return;
    } else {
      if (lists.find((item) => item.title === naziv)) {
        alert('List with that name already exists! Choose another name.');
        return;
      } else {
        return new List(naziv.trim());
      }
    }

    // const lista = new List(nazivListe);
  }

  sortTasks() {}

  addList() {
    confirmListCreation.addEventListener('click', (e) => {
      e.preventDefault();
      const novaLista = this.createList();
      if (typeof novaLista !== 'object') return;
      else {
        lists.push(novaLista);
        console.log(lists);
        view.hideListPopup();
        view.createListCard(novaLista);
        view.resetForm('listModal');
        // view.removeListCard();
        view.removeCard('listsContainer', lists);
        this.startCreatingTask();
        this.addTask();
        view.toggleTaskLists();
      }
    });
  }

  startCreatingList() {
    createListModal.addEventListener('click', () => {
      view.createListPopup();
    });
  }
  startCreatingTask() {
    // const createTaskModal = document.querySelectorAll('.createTaskModal');
    // createTaskModal.forEach((button) => {
    //   button.addEventListener('click', () => {
    //     view.createTaskPopup();
    //   });
    // });
  }

  addTask() {
    const createTaskModal = document.querySelectorAll('.createTaskModal');

    createTaskModal.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        view.createTaskPopup();

        confirmTaskCreation.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();

          let aktivancont = document.querySelector('.active');
          let idAktivnog = aktivancont.dataset.id;
          let lista = lists.find((item) => item.title === idAktivnog);
          let index = lists.indexOf(lista);

          const todo = this.createTask(idAktivnog);
          if (todo === undefined) return;
          else lists[index].tasks.push(todo);
          console.log(lists[index].tasks);
          view.hideTaskPopup();
          view.resetForm('popupmodal');
          view.createTaskCard(todo);
          view.removeCard('taskContainer', lists);
          view.doTask('taskContainer', lists);
          view.editTask('taskCard', lists);
          view.resetForm('editmodal');
        });
      });
    });
  }
}

export default new Controller();
