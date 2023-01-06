'use strict';

class List {
  constructor(title, tasks) {
    this.title = title;
    this.tasks = [];
  }
}

const basicTodos = new List('Basic');

class Task {
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

const createTask = () => {
  let title = prompt('Task title');
  let description = prompt('Task description:');
  let dueDate = prompt('What is the due date:');
  let priority = prompt('What is the task priority:');
  let notes = prompt('Do you have any additional notes:');
  return new Task(title, description, dueDate, priority, notes);
};

const deleteTask = () => {
  let name = prompt('What task do you want to delete');
  // basicTodos.tasks.pop();
  // let taskTitle = task;
  const zaBrisati = basicTodos.tasks.find((item) => item.title === name);
  let index = basicTodos.tasks.indexOf(zaBrisati);
  basicTodos.tasks.splice(index, 1);
  console.log(basicTodos.tasks);
};

const button = document.querySelector('.napraviTask');
const doTaskBtn = document.querySelector('.odradiTask');
const deleteTaskBtn = document.querySelector('.obrišiTask');

button.addEventListener('click', () => {
  // const todo = createTask();
  // console.log(todo);
  // basicTodos.tasks.push(todo);
  console.log(basicTodos.tasks);
  // showTasks();
});

doTaskBtn.addEventListener('click', () => {
  for (let task of basicTodos.tasks) {
    task.doTask();
    console.log(task.isDone);
  }
});

deleteTaskBtn.addEventListener('click', () => {
  deleteTask();
  console.log(basicTodos);
});

// console.log(createTask());
// const brijanje = createTask(
//   'Brijanje',
//   'Obrijati se',
//   'January 7, 2023',
//   'high'
// );

// console.log(brijanje);

function showTasks() {
  let el = document.createElement('p');
  document.querySelector('h3').appendChild(el);
  basicTodos.tasks.forEach((task) => {
    console.log(task.title);
    el.textContent += `${task.title} `;
  });
}

const datum = document.querySelector('#duedate');
console.log(datum.value);
