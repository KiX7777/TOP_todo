import controller from './controller.js';

class View {
  makeList() {
    const addListBtn = document.querySelector('.napraviListu');
    addListBtn.addEventListener('click', () => {
      controller.addList();
    });
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
