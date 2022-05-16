// Add task script here
var newTaskBtn = document.querySelector('#newTaskBtn');
var newTaskFormPopUp = document.querySelector('.newTaskFormPopUp');
var newTaskForm = document.getElementById('newTaskForm');
var innerList = document.querySelector('.innerStageBox');
var list = document.querySelectorAll('.innerStageBox');
var stageBoxes = document.querySelector('.innerStageBoxes');
var allStageBoxes = document.querySelectorAll('.innerStageBoxes');
var stages = document.querySelector('.stage');

// a list of existing tasks;
// var task = document.querySelector('.task');

var tasklist = [];
let num = 0;
let draggedItem = null;

// collect inputs entered by user;
var taskNameInput = document.getElementById('taskName');
var taskDueDateInput = document.getElementById('taskDueDate');
var priorityInput = document.getElementById('priority');
var estCompTimeInput = document.getElementById('estCompTime');
var keywordInput = document.getElementById('keyword');

// drag n drop vars
var tasks = document.querySelectorAll('.task');
var newTaskBtns = document.querySelectorAll('.newTaskBtn');

// Create new task;
function hideTaskForm() {
    newTaskFormPopUp.style.display = 'none';
}

class Task {
    constructor(taskName, taskDueDate, priority, estCompTime) {
        this.taskName = taskName;
        this.taskDueDate = taskDueDate;
        this.priority = priority;
        // this.keyword = keyword;
        this.estCompTime = estCompTime;
    }
}

function displayTaskPopUp() {
    for (i = 0; i < newTaskBtns.length; i++) {
        newTaskBtns[i].addEventListener("click", function () {
            newTaskFormPopUp.style.display = 'block';
        });
    }
}
displayTaskPopUp();

if (newTaskForm) {
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
}

function findBtnClicked() {
    newTaskBtns = document.querySelectorAll('.newTaskBtn');
    for (var i = 0; i < newTaskBtns.length; i++) {
        newTaskBtns[i].addEventListener('click', function (i) {
            num = i;
            console.log(num);
        }.bind(null, i));
    }
}

findBtnClicked();

// submit the request to create a task;
function submitTaskFrom(taskName, taskDueDate, priority, estCompTime) {
    let taskAppend = new Task(taskName, taskDueDate, priority, estCompTime);

    tasklist.push(taskAppend);
    renderTask(taskAppend);
}

// render the task entered/created in the corresponding stage;
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

    // append all newly created elements into the corresponding place;
    task.appendChild(menuEllipses);
    task.appendChild(taskTitle);
    task.appendChild(tagBtn);
    task.appendChild(taskDueDate);

    // findBtnClicked();
    innerList = allStageBoxes[num].querySelector('.innerStageBox');
    innerList.appendChild(task);

    newTaskFormPopUp.style.display = 'none';
    dragNdrop();
}


// create new stage;
var newStageBtn = document.getElementById('newStageBtn');
newStageBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // titleBar
    let titleBar = document.createElement('div');
    titleBar.setAttribute('class', 'titleBar');

    // label and input
    let stageInput = document.createElement('div');
    stageInput.setAttribute('class', 'stageInput');

    let stageLabel = document.createElement('label');
    stageLabel.setAttribute('for', 'stagetitle');

    let stageTitleInput = document.createElement('input');
    stageTitleInput.setAttribute('id', 'stageTitle');
    stageTitleInput.setAttribute('placeholder', 'Untitled Stage');

    // menubar
    let ellipsesBar = document.createElement('i');
    ellipsesBar.setAttribute('class', 'fa fa-minus');
    ellipsesBar.ariaHidden = "true";

    // all stages
    let stagecontent = document.createElement('div');
    stagecontent.setAttribute('class', 'stageContent');

    // one stage
    let innerStageBoxes = document.createElement('div');
    innerStageBoxes.setAttribute('class', 'innerStageBoxes');

    // 3 cols inside a stage
    let first = document.createElement('div');
    first.setAttribute('class', 'innerStageBox');

    let sec = document.createElement('div');
    sec.setAttribute('class', 'innerStageBox');

    let third = document.createElement('div');
    third.setAttribute('class', 'innerStageBox');

    // add new task button
    let newTaskBtn = document.createElement('button');
    newTaskBtn.textContent = "+ new task";
    newTaskBtn.setAttribute('class', 'newTaskBtn');
    newTaskBtn.setAttribute('type', 'submit');

    stageInput.appendChild(stageLabel);
    stageInput.appendChild(stageTitleInput);
    titleBar.appendChild(stageInput);
    titleBar.appendChild(ellipsesBar);

    innerStageBoxes.appendChild(first);
    innerStageBoxes.appendChild(sec);
    innerStageBoxes.appendChild(third);
    innerStageBoxes.appendChild(newTaskBtn);

    stagecontent.appendChild(titleBar);
    stagecontent.appendChild(innerStageBoxes);
    stages.appendChild(stagecontent);

    // update all buttons;
    newTaskBtns = document.querySelectorAll('.newTaskBtn');
    allStageBoxes = document.querySelectorAll('.innerStageBoxes');
    findBtnClicked();

    for (i = 0; i < newTaskBtns.length; i++) {
        newTaskBtns[i].addEventListener("click", function () {
            newTaskFormPopUp.style.display = 'block';
        });
    }
});

// drag and drop
function dragNdrop() {
    // update all tasks and stages in the page;
    tasks = document.querySelectorAll('.task');
    list = document.querySelectorAll('.innerStageBox');
    // drag n drop implemented to the updated nodelist of tasks. 
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
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        for (let j = 0; j < list.length; j++) {
            var ls = list[j];

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
}