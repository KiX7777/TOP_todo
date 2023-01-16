'use strict';

import { Task } from './app.js';
import { List } from './app.js';
import view from './view.js';
import { lists } from './app.js';
// import { format } from 'date-fns';

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
  //-----------------------------------------------------------------------------------------
  // TASK CREATION
  //-----------------------------------------------------------------------------------------
  createTask = (list) => {
    let taskTitle = title.value.trimEnd();
    if (!taskTitle || !taskTitle.trim().length === 0) {
      alert('Task name cannot be empty!');
      return;
    } else {
      let taskDescription = description.value;
      let taskdueDate = new Date(duedate.value);
      let datum = new Intl.DateTimeFormat('hr-HR').format(taskdueDate);
      // let date = format(new Date(duedate.value), 'dd/MM/yyyy');
      // console.log(date);

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
  addTask() {
    const createTaskModal = document.querySelectorAll('.createTaskModal');

    const close = document.querySelector('.closetaskmodalimg');
    close.addEventListener('click', (e) => {
      e.preventDefault();
      view.hideTaskPopup();
      view.resetForm('popupmodal');
    });

    const closeedit = document.querySelector('.closeeditmodalimg');
    closeedit.addEventListener('click', (e) => {
      e.preventDefault();
      view.hideEditPopup();
      view.resetForm('editmodal');
    });
    let escape = document.querySelector('.popupmodal');
    escape.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        view.hideTaskPopup();
        view.resetForm('popupmodal');
      }
    });
    let overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', () => {
      view.hideTaskPopup();
      view.hideEditPopup();
      view.hideListPopup();
      view.resetForm('popupmodal');
      view.resetForm('listModal');
    });

    confirmTaskCreation.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      let aktivancont = document.querySelector('div.active');
      let idAktivnog = aktivancont.dataset.id;
      let lista = lists.find((item) => item.title === idAktivnog);
      let index = lists.indexOf(lista);

      let todo = this.createTask(idAktivnog);
      if (todo === undefined) return;
      else lists[index].tasks.push(todo);

      view.hideTaskPopup();
      view.resetForm('popupmodal');
      view.createTaskCard(todo);
      view.removeCard('taskContainer', lists);
      view.doTask('taskContainer', lists);
      view.editTask('taskCard', lists);
      view.resetForm('editmodal');
      this.saveLocal();
    });
  }

  //-----------------------------------------------------------------------------------------
  // LIST CREATION
  //-----------------------------------------------------------------------------------------

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
        return new List(naziv);
      }
    }

    // const lista = new List(nazivListe);
  }

  addList() {
    confirmListCreation.addEventListener('click', (e) => {
      e.preventDefault();
      let novaLista = this.createList();
      if (typeof novaLista !== 'object') return;
      else {
        lists.push(novaLista);
        view.hideListPopup();
        view.createListCard(novaLista);
        view.resetForm('listModal');
        view.removeCard('listsContainer', lists);

        view.toggleTaskLists();
        view.showSidebar();
        this.saveLocal();

        const createTaskModal = document.querySelectorAll('.createTaskModal');
        createTaskModal.forEach((button) => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            view.createTaskPopup();
            // this.addTask();
          });
        });
      }
    });
  }
  startCreatingList() {
    createListModal.addEventListener('click', () => {
      view.createListPopup();
      view.containerColor();
      const close = document.querySelector('.closelistmodalimg');
      close.addEventListener('click', (e) => {
        e.preventDefault();
        view.hideListPopup();
        console.log('tes');
        view.resetForm('listModal');
      });
    });
  }

  saveLocal() {
    localStorage.setItem('Lists', JSON.stringify(lists));
  }
}

export default new Controller();
