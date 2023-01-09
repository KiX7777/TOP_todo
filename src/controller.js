'use strict';

import { Task } from './app.js';
import { List } from './app.js';
import view from './view.js';
import { lists } from './app.js';

const createTaskModal = document.querySelector('.createTaskModal');
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
    let taskTitle = title.value;
    if (!taskTitle || !taskTitle.trim().length === 0) {
      alert('TITLE IS MANDATORY');
      return;
    } else {
      let taskDescription = description.value;
      let taskdueDate = duedate.value;
      if (!taskdueDate || !taskdueDate.trim().length === 0) {
        alert('DATE IS MANDATORY');
        return;
      } else {
        let taskPriority = priority2.value;
        let taskNotes = notes.value;
        return new Task(
          taskTitle,
          taskDescription,
          taskdueDate,
          taskPriority,
          taskNotes,
          list
        );
      }
    }
  };

  createList() {
    let naziv = listName.value;
    if (!naziv || naziv.trim().length === 0) {
      alert('INSERT CORRECT LIST NAME');
      naziv = prompt('Naziv liste');
    } else {
      return new List(naziv);
    }
    // const lista = new List(nazivListe);
  }

  addList() {
    confirmListCreation.addEventListener('click', (e) => {
      e.preventDefault();
      const novaLista = this.createList();
      if (typeof novaLista !== 'object') return;
      else {
        console.log(typeof novaLista);
        lists.push(novaLista);
        console.log(lists);
        view.hideListPopup();
        view.createListCard(novaLista);
        view.resetForm('listModal');
        // view.removeListCard();
        view.removeCard('listsContainer', lists);
      }
    });
  }

  startCreatingList() {
    createListModal.addEventListener('click', () => {
      view.createListPopup();
    });
  }
  startCreatingTask() {
    createTaskModal.addEventListener('click', () => {
      view.createTaskPopup();
    });
  }

  addTask() {
    confirmTaskCreation.addEventListener('click', (e) => {
      e.preventDefault();
      let kojaLista = prompt('U koju listu želite dodati zadatak');
      let listIndex = lists.find((item) => item.title === kojaLista);
      if (!listIndex || listIndex === null) alert('THAT LIST DOES NOT EXIST');
      else {
        let index = lists.indexOf(listIndex);

        const todo = this.createTask(kojaLista);
        if (todo === undefined) return;
        else lists[index].tasks.push(todo);
        console.log(lists[index].tasks);
        view.hideTaskPopup();
        view.resetForm('popupmodal');
        view.createTaskCard(todo);
        view.showSuccessMsg();
        view.removeCard('taskContainer', lists);
        view.doTask('taskContainer', lists);
        setTimeout(view.hideSuccessMsg, 2000);
      }
    });
  }

  deleteTask = () => {
    let listName = prompt('From which list do you want to delete');

    let selectedList = lists.find((item) => item.title === listName);
    if (!selectedList || selectedList === null) {
      alert('THAT LIST DOES NOT EXIST');
      return;
    } else {
      let taskname = prompt('What task do you want to delete');
      let listIndex = lists.indexOf(selectedList);
      const delTask = lists[listIndex].tasks.find(
        (item) => item.title === taskname
      );
      if (!delTask || delTask === null) alert('THAT TASK DOES NOT EXIST');
      else {
        let taskindex = lists[listIndex].tasks.indexOf(delTask);
        lists[listIndex].tasks.splice(taskindex, 1);
        console.log(lists[listIndex].tasks);
      }
    }
  };
}

export default new Controller();
