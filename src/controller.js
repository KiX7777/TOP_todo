'use strict';

import { Task } from './app.js';
import { List } from './app.js';
import view from './view.js';
import { lists } from './app.js';

export class Controller {
  createTask = () => {
    let title = prompt('Task title');
    if (!title || !title.trim().length === 0) {
      alert('TITLE IS MANDATORY');
      return;
    } else {
      let description = prompt('Task description:');
      let dueDate = prompt('What is the due date:');
      if (!dueDate || !dueDate.trim().length === 0) {
        alert('DATE IS MANDATORY');
        return;
      } else {
        let priority = prompt('What is the task priority:');
        let notes = prompt('Do you have any additional notes:');

        return new Task(title, description, dueDate, priority, notes);
      }
    }
  };

  createList() {
    let naziv = prompt('Naziv liste');
    if (!naziv || naziv.trim().length === 0) {
      alert('INSERT CORRECT LIST NAME');
      naziv = prompt('Naziv liste');
    } else {
      return new List(naziv);
    }
    // const lista = new List(nazivListe);
  }

  addList() {
    const novaLista = this.createList();
    if (typeof novaLista !== 'object') return;
    else {
      console.log(typeof novaLista);
      lists.push(novaLista);
      console.log(lists);
    }
  }

  addTask() {
    const addTaskBtn = document.querySelector('.napraviTask');
    const doTaskBtn = document.querySelector('.odradiTask');
    const deleteTaskBtn = document.querySelector('.obrišiTask');
    const datum = document.querySelector('#duedate');
    addTaskBtn.addEventListener('click', () => {
      let kojaLista = prompt('U koju listu želite dodati zadatak');
      let listIndex = lists.find((item) => item.title === kojaLista);
      if (!listIndex || listIndex === null) alert('THAT LIST DOES NOT EXIST');
      else {
        let index = lists.indexOf(listIndex);

        const todo = this.createTask();
        if (todo === undefined) return;
        else lists[index].tasks.push(todo);
        // kojaLista.tasks.push(todo);
        // lists.list.tasks.push(todo);
        console.log(lists[index].tasks);
        view.showTasks(lists[index]);
        // overlay.style.display = 'block';
      }
    });
  }

  deleteTask = () => {
    let listName = prompt('From which list do you want to delete');
    // basicTodos.tasks.pop();
    // let taskTitle = task;

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

  doTask() {
    const doTaskBtn = document.querySelector('.odradiTask');
    doTaskBtn.addEventListener('click', () => {
      let listName = prompt('From which list do you want to finish task');
      // for (let task of lists[0].tasks) {
      //   task.doTask();
      //   console.log(task.isDone);
      // }

      let selectedList = lists.find((item) => item.title === listName);
      if (!selectedList || selectedList === null) {
        alert('THAT LIST DOES NOT EXIST');
        return;
      } else {
        let taskname = prompt('What task do you want to finish');
        let listIndex = lists.indexOf(selectedList);
        const doTask = lists[listIndex].tasks.find(
          (item) => item.title === taskname
        );
        if (!doTask || doTask === null) alert('THAT TASK DOES NOT EXIST');

        let taskindex = lists[listIndex].tasks.indexOf(doTask);
        lists[listIndex].tasks[taskindex].doTask();
        console.log('TASK FINISHED');
      }
    });
  }
}

export default new Controller();
