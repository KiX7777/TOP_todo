import { lists } from './app.js';
import controller from './controller.js';

///SELEKTORI
const overlay = document.querySelector('.overlay');
const taskPopup = document.querySelector('.popupmodal');
const listPopup = document.querySelector('.listModal');
const editPopup = document.querySelector('.editmodal');
const successMsg = document.querySelector('.success');
const listContainer = document.querySelector('.listsContainer');
const taskContainer = document.querySelector('.taskContainer');
const mainContainer = document.querySelector('.maincontainer');
const dateInput = document.querySelector('#duedate');
const priority = document.querySelector('#priority2');
const sidebar = document.querySelector('.sidebar');

const date = new Date();
const today = date.toISOString().split('T')[0];

class View {
  //-----------------------------------------------------------------------------------------
  // LOAD FROM LOCAL STORAGE
  //-----------------------------------------------------------------------------------------

  renderStarting() {
    lists.forEach((list) => {
      // this.createListCard(list);
      let card = document.createElement('div');
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
      taskcontainer.classList = `taskContainer ${list.title.replaceAll(
        ' ',
        ''
      )} `;

      taskcontainer.innerHTML = `
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 sidebarToggle"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6 createTaskModal active"
    >
      <path
        fill-rule="evenodd"
        d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z"
        clip-rule="evenodd"
      ></path>
      <path
        d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
      ></path>
    </svg>
  
  
                                  <h1 >${list.title}</h1>                       
      `;

      document.querySelectorAll('div.taskContainer').forEach((container) => {
        if (!container.classList.contains('Default')) {
          container.classList.remove('active');
          container.style.display = 'none';
          taskcontainer.dataset.id = list.title;
          mainContainer.appendChild(container);
        }
      });
      // document.querySelector('.taskContainer .Default').style.display = 'flex';
    });
  }
  //-----------------------------------------------------------------------------------------
  //SHOW POPUPS FOR LIST/TASK CREATION
  //-----------------------------------------------------------------------------------------

  createListPopup() {
    overlay.style.display = 'block';
    listPopup.classList.toggle('scale-in-center');
    listPopup.style.display = 'block';
    document.querySelector('.listName').focus();
  }

  hideListPopup() {
    overlay.style.display = 'none';
    listPopup.classList.toggle('scale-in-center');

    listPopup.style.display = 'none';
  }

  createTaskPopup() {
    if (lists.length < 1) {
      return;
    } else {
      overlay.style.display = 'block';
      taskPopup.style.display = 'block';
      dateInput.setAttribute('value', today);
      title.focus();
    }
  }
  createEditPopup() {
    overlay.style.display = 'block';
    editPopup.style.display = 'block';
    dateInput.setAttribute('value', today);
  }

  hideTaskPopup() {
    overlay.style.display = 'none';
    taskPopup.style.display = 'none';
  }
  hideEditPopup() {
    overlay.style.display = 'none';
    editPopup.style.display = 'none';
  }

  showSuccessMsg() {
    successMsg.style.display = 'block';
    overlay.style.display = 'block';
  }
  hideSuccessMsg() {
    successMsg.style.display = 'none';
    overlay.style.display = 'none';
  }

  //-----------------------------------------------------------------------------------------
  // RESET FORMS
  //-----------------------------------------------------------------------------------------

  resetForm(container) {
    let forms = document.querySelector(`.${container}`);
    // let listcolor = document.querySelector('#color').value;

    forms.querySelectorAll('input[type=text]').forEach((form) => {
      form.value = '';
      dateInput.value = today;
      priority.value = '';
    });
  }

  //-----------------------------------------------------------------------------------------
  // CREATE LIST CARDS
  //-----------------------------------------------------------------------------------------

  createListCard(list) {
    let id = 0;
    let card = document.createElement('div');
    // this.containerColor();

    // card.className = 'listCard';
    card.classList = 'card listCard';
    if (list.title !== 'Default') {
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
    } else {
      card.innerHTML = ` <p class="title">${list.title}</p> 
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>`;
    }

    //IF THERE IS A CONTAINER, HIDE PREVIOUS ONES AND DISPLAY THE NEW ONE
    if (document.querySelector('.taskContainer')) {
      document.querySelectorAll('.taskContainer').forEach((container) => {
        container.style.display = 'none';
        container.classList.remove('active');
      });
    }

    listContainer.appendChild(card);
    // mainContainer.innerHTML = '';
    let taskcontainer = document.createElement('div');
    taskcontainer.classList = `taskContainer ${list.title.replaceAll(
      ' ',
      ''
    )} active`;

    taskcontainer.innerHTML = `

    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6 sidebarToggle"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="w-6 h-6 createTaskModal active"
  >
    <path
      fill-rule="evenodd"
      d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z"
      clip-rule="evenodd"
    ></path>
    <path
      d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
    ></path>
  </svg>


                                <h1 >${list.title}</h1>                       
    `;

    taskcontainer.dataset.id = list.title;
    let findcolor = document.querySelector('.chosencolor');
    let color = window.getComputedStyle(findcolor).backgroundColor;
    taskcontainer.dataset.color = color;
    list.color = color;

    taskcontainer.style.backgroundColor = list.color;
    mainContainer.appendChild(taskcontainer);
  }

  containerColor() {
    let cont = document.querySelector('div.active');
    let color = document.querySelectorAll('.color');
    color.forEach((boja) => {
      boja.addEventListener('click', (e) => {
        document.querySelectorAll('.color').forEach((col) => {
          col.classList.remove('chosencolor');
          col.style.border = '';
        });
        e.preventDefault();
        e.stopImmediatePropagation();
        boja.classList.add('chosencolor');
        boja.style.border = '1px solid white';
      });
    });
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

  //-----------------------------------------------------------------------------------------
  // MARK TASK AS FINISHED
  //-----------------------------------------------------------------------------------------
  doTask(container, lists) {
    const cont = document.querySelectorAll(`.${container}`);

    cont.forEach((container) => {
      container.querySelectorAll('.finishCardBtn').forEach((button) => {
        button.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          let card = e.target.parentNode.closest('.card');
          let taskname = card.querySelector('.title').textContent;
          const check = card.querySelector('.checkBtn');

          let imeListe = card.dataset.listId;
          let selectedList = lists.find((item) => item.title === imeListe);
          let listIndex = lists.indexOf(selectedList);

          const deleteTask = lists[listIndex].tasks.find(
            (item) => item.title === taskname.trim()
          );
          let taskindex = lists[listIndex].tasks.indexOf(deleteTask);
          lists[listIndex].tasks[taskindex].isDone = true;
          controller.saveLocal();

          check.style.fill = 'green';
          check.style.color = 'white';
          card.style.background = 'none';
          card.classList.add('finished');
          card.dataset.finished = '';
          card.style.backgroundColor = '#06d6a0';
        });
      });
    });

    // let task = document.querySelector(`.${container}`);
  }

  //-----------------------------------------------------------------------------------------
  // REMOVE CARD
  //-----------------------------------------------------------------------------------------

  removeCard(container, lists) {
    let buttonCont = document.querySelectorAll(`.${container}`);
    //S
    buttonCont.forEach((container) => {
      container.querySelectorAll('.deleteCardbtn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          let card = e.target.parentNode;

          let cardToDelete = e.target.parentNode.closest('.card');

          cardToDelete.closest('.card').classList.add('fade-out');
          setTimeout(() => {
            cardToDelete.closest('.card').remove();
          }, 200);

          let title = cardToDelete.querySelector('.title').textContent;
          let containertoDelete = document.querySelector(`.${title}`);
          // IF LIST IS TO BE REMOVED
          if (cardToDelete.classList.contains('listCard')) {
            let correctList = lists.find((item) => item.title === title.trim());
            let listIndex = lists.indexOf(correctList);
            if (listIndex === -1) {
              return;
            } else {
              lists.splice(listIndex, 1);

              containertoDelete.remove();
              controller.saveLocal();
              if (lists.length < 1) {
                localStorage.removeItem('Lists');
              }

              //SWITCH TO PREVIOUS LIST
              let toggleTo = listIndex - 1;
              let name = lists[toggleTo].title;
              let color = lists[toggleTo].color;
              document
                .querySelectorAll('.taskContainer')
                .forEach((container) => {
                  container.style.display = 'none';
                  container.classList.remove('active');
                });
              document.querySelector(`.${name}`).style.display = 'flex';
              document.querySelector(`.${name}`).classList.add('active');
              document.querySelector(`.${name}`).style.backgroundColor = color;
            }

            return;
            //IF TASK IS TO BE REMOVED
          } else if (cardToDelete.classList.contains('taskCard')) {
            let imeListe = cardToDelete.dataset.listId;
            let selectedList = lists.find((item) => item.title === imeListe);
            let listIndex = lists.indexOf(selectedList);
            let findTask = lists[listIndex].tasks.find(
              (task) => task.title === title.trim()
            );
            let taskindex = lists[listIndex].tasks.indexOf(findTask);

            lists[listIndex].tasks.splice(taskindex, 1);
            controller.saveLocal();
            if (lists.length < 1) {
              localStorage.removeItem('Lists');
            }
          }
        });
      });
    });
  }

  //-----------------------------------------------------------------------------------------
  // CREATE TASK
  //-----------------------------------------------------------------------------------------

  createTaskCard(task) {
    let card = document.createElement('div');
    const taskContainer = document.querySelector(
      `.${task.list.replaceAll(' ', '')}`
    );
    if (task.priority === 'important') {
      card.classList = 'taskCard card importantCard';
    } else {
      card.classList = 'taskCard card';
    }
    card.dataset.listId = task.list;
    let shortDate = task.dueDate.slice(0, 13);

    card.innerHTML = `
                      <span class="taskCardinfo title">${task.title.trim()}</span>
                      ${
                        task.priority === 'important'
                          ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 important">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        `
                          : ''
                      }
                      <span class="taskCardinfo description">${
                        task.description
                      }</span>
                      <span class="taskCardinfo duedate">${shortDate}</span>
                      <span class="taskCardinfo notes">${task.notes}</span>

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
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 editCardBtn"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      </div>
`;

    if (task.isDone === true) {
      const check = card.querySelector('.checkBtn');
      card.style.background = 'none';
      card.style.backgroundColor = '#06d6a0';
      card.classList.add('finished');
      card.dataset.finished = '';
      check.style.fill = 'green';
      check.style.color = 'white';
      taskContainer.appendChild(card);
    } else {
      taskContainer.appendChild(card);
    }
  }

  //-----------------------------------------------------------------------------------------
  // TOGGLE LISTS
  //-----------------------------------------------------------------------------------------

  toggleTaskLists() {
    let list = document.querySelectorAll('.listCard');
    list.forEach((card) =>
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        let naziv;
        if (e.target.className === 'title') {
          naziv = e.target.textContent.trim();
          let container = document.querySelector(
            `.taskContainer.${naziv.replaceAll(' ', '')}`
          );

          document.querySelectorAll('.taskContainer').forEach((container) => {
            container.style.display = 'none';
            container.classList.remove('active');
          });

          container.style.display = 'flex';
          container.classList.add('active');
          let correctList = lists.find((item) => item.title === naziv.trim());
          let listIndex = lists.indexOf(correctList);
          let color = lists[listIndex].color;

          container.style.display = 'flex';
          container.classList.add('active');
          container.style.backgroundColor = color;
        } else {
          naziv = e.target.querySelector(`.title`).textContent;

          let container = document.querySelector(
            `.taskContainer.${naziv.replaceAll(' ', '')}`
          );

          document.querySelectorAll('.taskContainer').forEach((container) => {
            container.style.display = 'none';
            container.classList.remove('active');
            container.classList.add('.swing-top-fwd');
          });

          let correctList = lists.find((item) => item.title === naziv.trim());
          let listIndex = lists.indexOf(correctList);
          let color = lists[listIndex].color;

          container.style.display = 'flex';
          container.classList.add('active');
          container.style.backgroundColor = color;
        }
      })
    );
  }

  //-----------------------------------------------------------------------------------------
  // SHOW/HIDE SIDEBAR
  //-----------------------------------------------------------------------------------------
  showSidebar() {
    const sidebarBtn = document.querySelectorAll('.sidebarToggle');

    sidebarBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        // sidebar.style.left = '0';
        let cont = document.querySelector('div.active');
        cont.classList.toggle('moveMain');
        sidebar.style.left = '0';
        sidebar.style.width = 'clamp(15rem, 20rem, 20%)';
      });
    });
  }

  //-----------------------------------------------------------------------------------------
  // EDIT TASK
  //-----------------------------------------------------------------------------------------
  editTask(task, lists) {
    const cont = document.querySelectorAll(`.${task}`);
    cont.forEach((taskCard) => {
      const savebtn = document.querySelector('.editTask');
      taskCard.querySelectorAll('.editCardBtn').forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          let card = e.target.parentNode.closest('.card');
          let taskname = card.querySelector('.title');
          let taskdesc = card.querySelector('.description');
          let tasknotes = card.querySelector('.notes');
          let taskdate = card.querySelector('.duedate');
          let formtitle = document.getElementById('editTitle');
          let formdesc = document.getElementById('editDescription');
          let formnotes = document.getElementById('editNotes');
          let formdate = document.getElementById('editDueDate');

          formtitle.value = taskname.textContent;
          console.log(taskname.textContent);
          formdesc.value = taskdesc.textContent;
          formnotes.value = tasknotes.textContent;
          formdate.value = today;
          this.createEditPopup();
          savebtn.addEventListener('click', (e) => {
            e.preventDefault();
            let imeListe = card.dataset.listId;
            let selectedList = lists.find((item) => item.title === imeListe);
            let listIndex = lists.indexOf(selectedList);

            const editTask = lists[listIndex].tasks.find(
              (item) => item.title === taskname.textContent.trim()
            );

            let date = new Date(formdate.value);
            let shortDate = date.toLocaleDateString();
            let taskindex = lists[listIndex].tasks.indexOf(editTask);
            let tasktoEdit = lists[listIndex].tasks[taskindex];
            tasktoEdit['title'] = formtitle.value.trim();
            tasktoEdit['description'] = formdesc.value.trim();
            tasktoEdit['notes'] = formnotes.value.trim();
            tasktoEdit['dueDate'] = shortDate;
            taskname.textContent = formtitle.value.trim();
            taskdesc.textContent = formdesc.value.trim();
            tasknotes.textContent = formnotes.value.trim();
            taskdate.textContent = shortDate;
            this.hideEditPopup();
            controller.saveLocal();
          });

          // this.hideEditPopup();
        });
      });
    });
  }
}

export default new View();
