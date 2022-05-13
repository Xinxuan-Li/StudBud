// Add task script here
var newTaskBtn = document.querySelector('#newTaskBtn');
var newTaskFormPopUp = document.querySelector('.newTaskFormPopUp');
var newTaskForm = document.getElementById('newTaskForm');
var lists = document.querySelectorAll('.innerStageBoxes');
var innerList = document.querySelector('.innerStageBox');

// a list of existing tasks;
var task = document.querySelector('.task');

var tasklist = [];

var taskNameInput = document.getElementById('taskName');
var taskDueDateInput = document.getElementById('taskDueDate');
var priorityInput = document.getElementById('priority');
var estCompTimeInput = document.getElementById('estCompTime');
var keywordInput = document.getElementById('keyword');

// ******** Dragging event script ****** //
var tasks = document.querySelectorAll('.task');
var list = document.querySelectorAll('.innerStageBox');
// console.log(tasks);

var newTaskBtns = document.getElementsByClassName('newTaskBtn');

let draggedItem = null;

class Task {
    constructor(taskName, taskDueDate, priority, estCompTime) {
        this.taskName = taskName;
        this.taskDueDate = taskDueDate;
        this.priority = priority;
        // this.keyword = keyword;
        this.estCompTime = estCompTime;
    }
}

function hideTaskForm() {
    newTaskFormPopUp.style.display = 'none';
}

for (i = 0; i < newTaskBtns.length; i++) {
    newTaskBtns[i].addEventListener("click", function () {
        newTaskFormPopUp.style.display = 'block';
    });
}

newTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let taskName = taskNameInput.value;
    let taskDueDate = taskDueDateInput.value;
    let priority = priorityInput.options[priorityInput.selectedIndex].value;
    // let keyword = keywordInput.value;
    let estCompTime = estCompTimeInput.value;
    submitTaskFrom(taskName, taskDueDate, priority, estCompTime);
    console.log('here');
});

function submitTaskFrom(taskName, taskDueDate, priority, estCompTime) {
    let taskAppend = new Task(taskName, taskDueDate, priority, estCompTime);

    tasklist.push(taskAppend);
    renderTask(taskAppend);
    console.log(tasklist);
}

function renderTask(taskAppend) {
    let task = document.createElement('div');
    task.setAttribute('class', 'task');
    task.draggable = "true";

    let menuEllipses = document.createElement('i');
    menuEllipses.setAttribute('class', 'fa fa-ellipsis-h');
    menuEllipses.ariaHidden = "true";

    //task title;
    let taskTitle = document.createElement('h4');
    taskTitle.innerHTML = taskAppend.taskName;

    //task priority tag;
    let tagBtn = document.createElement('button');
    tagBtn.setAttribute('id', 'tagBtn');
    tagBtn.innerHTML = taskAppend.priority;

    //task due date;
    let taskDueDate = document.createElement('p');
    taskDueDate.innerHTML = taskAppend.taskDueDate;

    task.appendChild(menuEllipses);
    task.appendChild(taskTitle);
    task.appendChild(tagBtn);
    task.appendChild(taskDueDate);

    innerList.append(task);
    tasks = document.querySelectorAll('.task');
    console.log(tasks);
    newTaskFormPopUp.style.display = 'none';

    for (let i = 0; i < tasks.length; i++) {
        const item = tasks[i];

        item.addEventListener('dragstart', function () {
            draggedItem = item;
            setTimeout(function () {
                draggedItem.style.display = 'none';
            }, 0);
        });

        item.addEventListener('dragend', function () {
            setTimeout(function () {
                // draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        for (let j = 0; j < list.length; j++) {
            const ls = list[j];

            ls.addEventListener('dragover', function (event) {
                event.preventDefault();
            });

            ls.addEventListener('dragenter', function (event) {
                event.preventDefault();
            });

            ls.addEventListener('drop', function (event) {
                this.append(draggedItem);
            });
        }
    }
    // ******** Dragging event script ends **** //
}