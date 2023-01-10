import controller from './controller.js';

///SELEKTORI
const overlay = document.querySelector('.overlay');
const taskPopup = document.querySelector('.popupmodal');
const listPopup = document.querySelector('.listModal');
const successMsg = document.querySelector('.success');
const listContainer = document.querySelector('.listsContainer');
const taskContainer = document.querySelector('.taskContainer');
const mainContainer = document.querySelector('.maincontainer');
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
    let id = 0;
    let card = document.createElement('div');

    // card.className = 'listCard';
    card.classList = 'card listCard';
    card.innerHTML = ` <p class="title">${list.title}</p>   <svg
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
    let taskcontainer = document.createElement('div');
    taskcontainer.classList = `taskContainer ${list.title.replaceAll(' ', '')}`;
    mainContainer.appendChild(taskcontainer);
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
        const check = card.querySelector('.checkBtn');

        // let taskindex = lists[0].indexOf(naziv);

        const deleteTask = lists[0].tasks.find(
          (item) => item.title === taskname.trim()
        );

        let taskindex = lists[0].tasks.indexOf(deleteTask);
        lists[0].tasks[taskindex].doTask();
        console.log('TASK FINISHED');

        check.style.fill = 'green';
        check.style.color = 'white';
        card.style.backgroundColor = 'lightgreen';
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
        console.log(card.parentElement);

        card.closest('.card').remove();

        let cardToDelete = e.target.parentNode.closest('.card');
        let title = cardToDelete.querySelector('.title').textContent;
        let containertoDelete = document.querySelector(`.${title}`);
        containertoDelete.remove();
        //LOGIKA -- UVJET ZA BRISANJE LISTE
        // debugger;
        console.log(cardToDelete.classList);
        if (cardToDelete.classList.contains('listCard')) {
          let correctList = lists.find((item) => item.title === title.trim());
          let listIndex = lists.indexOf(correctList);
          if (listIndex === -1) {
            return;
          } else {
            lists.splice(listIndex, 1);
            console.log(lists);
          }
          return;
        } else if (cardToDelete.classList.contains('taskCard')) {
          let findTask = lists[0].tasks.find(
            (task) => task.title === title.trim()
          );
          console.log(findTask);
          let taskindex = lists[0].tasks.indexOf(findTask);

          lists[0].tasks.splice(taskindex, 1);
          console.log(lists[0].tasks);
        }
      });
    });
  }

  createTaskCard(task) {
    let card = document.createElement('div');
    console.log(task.list);
    const taskContainer = document.querySelector(
      `.${task.list.replaceAll(' ', '')}`
    );
    console.log(taskContainer);
    if (task.priority === 'important') {
      card.classList = 'taskCard card importantCard';
    } else {
      card.classList = 'taskCard card';
    }
    let shortDate = task.dueDate.slice(0, 13);

    card.innerHTML = `
                      <p class="taskCardinfo title"><strong>${
                        task.title
                      }</strong> ${
      task.priority === 'important'
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 important">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      `
        : ''
    }</p>
                      <p class="taskCardinfo">${task.description}</p>
                      <p class="taskCardinfo"><strong>Due date: </strong>${shortDate}</p>
                      <p class="taskCardinfo"></p>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 finishCardBtn checkBtn">
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
