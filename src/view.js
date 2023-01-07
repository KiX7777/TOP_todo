import controller from './controller.js';

///SELEKTORI
const overlay = document.querySelector('.overlay');
const taskPopup = document.querySelector('.popupmodal');
const listPopup = document.querySelector('.listModal');

class View {
  createListPopup() {
    overlay.style.display = 'block';
    listPopup.style.display = 'block';
  }

  createTaskPopup() {
    overlay.style.display = 'block';
    taskPopup.style.display = 'block';
  }

  showTasks(list) {
    let el = document.createElement('p');
    document.querySelector('h3').appendChild(el);
    list.tasks.forEach((task) => {
      console.log(task.title);
      el.textContent += `${task.title} `;
    });
  }

  deleteTask() {
    const deleteTaskBtn = document.querySelector('.obrišiTask');
    deleteTaskBtn.addEventListener('click', () => {
      controller.deleteTask();
    });
  }
}

export default new View();
