import controller from './controller.js';

///SELEKTORI
const overlay = document.querySelector('.overlay');
const taskPopup = document.querySelector('.popupmodal');
const listPopup = document.querySelector('.listModal');
const successMsg = document.querySelector('.success');
const listContainer = document.querySelector('.listsContainer');
const taskContainer = document.querySelector('.taskContainer');
const dateInput = document.querySelector('#duedate');
const priority = document.querySelector('#priority2');

const date = new Date();
const today = date.toISOString().split('T')[0];
console.log(today);

class View {
  createListPopup() {
    overlay.style.display = 'block';
    listPopup.style.display = 'block';
  }

  hideListPopup() {
    overlay.style.display = 'none';
    listPopup.style.display = 'none';
  }

  createTaskPopup() {
    overlay.style.display = 'block';
    taskPopup.style.display = 'block';
    dateInput.setAttribute('value', today);
  }

  hideTaskPopup() {
    overlay.style.display = 'none';
    taskPopup.style.display = 'none';
  }

  showSuccessMsg() {
    successMsg.style.display = 'block';
    overlay.style.display = 'block';
  }
  hideSuccessMsg() {
    successMsg.style.display = 'none';
    overlay.style.display = 'none';
  }

  resetForm(container) {
    let forms = document.querySelector(`.${container}`);
    forms.querySelectorAll('input').forEach((form) => {
      form.value = '';
      dateInput.value = today;
      priority.value = '';
    });
  }

  createListCard(list) {
    let card = document.createElement('div');
    // card.className = 'listCard';
    card.classList = 'card listCard';
    card.innerHTML = ` ${list.title}   <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6 deleteCardbtn"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>`;
    listContainer.appendChild(card);
  }

  removeListCard() {
    const deleteCardbtns = document.querySelectorAll('.deleteCardbtn');
    deleteCardbtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        btn.parentElement.remove();
      });
    });
  }

  doTask(container, lists) {
    const cont = document.querySelector(`.${container}`);
    const button = cont.querySelectorAll('.finishCardBtn');

    button.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        let card = e.target.parentNode.closest('.card');
        let taskname = card.querySelector('.title').textContent;
        console.log(taskname);

        // let taskindex = lists[0].indexOf(naziv);

        const doTask = lists[0].tasks.find((item) => item.title === taskname);

        let taskindex = lists[0].tasks.indexOf(doTask);
        lists[0].tasks[taskindex].doTask();
        console.log('TASK FINISHED');
      });
    });

    // let task = document.querySelector(`.${container}`);
  }

  removeCard(container, lists) {
    let buttonCont = document.querySelector(`.${container}`);
    buttonCont.querySelectorAll('.deleteCardbtn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        let card = e.target.parentNode;
        card.closest('.card').remove();

        let deletecard = e.target.parentNode.closest('.card');
        let taskname = deletecard.querySelector('.title').textContent;
        console.log(taskname);
        console.log(lists);

        const deleteTask = lists[0].tasks.find(
          (item) => item.title === taskname
        );

        let taskindex = lists[0].tasks.indexOf(deleteTask);
        lists[0].tasks.splice(taskindex, 1);
        console.log('TASK DELETED');
        console.log(lists);
      });
    });
  }

  createTaskCard(task) {
    let card = document.createElement('div');
    card.classList = 'taskCard card';
    card.innerHTML = `    
                      <p class="taskCardinfo title">${task.title}</p>
                      <p class="taskCardinfo">${task.description}</p>
                      <p class="taskCardinfo">${task.dueDate}</p>
                      <p class="taskCardinfo">${task.priority}</p>
                      <p class="taskCardinfo">${task.notes}</p>
                      <div class="cardBtns ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 deleteCardbtn"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 finishCardBtn">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
`;

    taskContainer.appendChild(card);
  }

  deleteTask() {
    const deleteTaskBtn = document.querySelector('.obrišiTask');
    deleteTaskBtn.addEventListener('click', () => {
      controller.deleteTask();
    });
  }
}

export default new View();
