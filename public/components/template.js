// Add task variables;
var newTaskBtn = document.querySelector('#newTaskBtn');
var newTaskFormPopUp = document.querySelector('.newTaskFormPopUp');
var newTaskForm = document.getElementById('newTaskForm');
var innerList = document.querySelector('.innerStageBox');
var list = document.querySelectorAll('.innerStageBox');
var stageBoxes = document.querySelector('.innerStageBoxes');
var allStageBoxes = document.querySelectorAll('.innerStageBoxes');
var stages = document.querySelector('.stage');
var projTitle = document.getElementById('projTitle');

// Drag and drop variablesl;
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

// retreive titles in local storage, when corresponding projectCol clicked, it directly changes the project name on display;
var projTitle = document.getElementById('projTitle');
var c = localStorage.getItem('projEnteredNum');
let l = localStorage.getItem('projects');
l = JSON.parse(l);

//Mark as done variables;
var markdone = document.getElementById('markDoneBtn');

// content expandable variables;
var expandContent = document.querySelectorAll(".titleBar");

// Info icon pop up window varibale;
var guide = document.getElementById('guide');

// Make stage as complete variable;
var stageDoneBtn = document.querySelectorAll('#stageCheck');

// Get quote request variables;
var quote = document.getElementById('quote');
var author = document.getElementById('author');

/* 
SIDE NOTE: none of the tasks will be saved in local storage, and most of the interactions and contents would not be saved;
*/

// Methods to be run everytime window loads;
// Reading from LocalStorage;
retrieveData();
// Find the stage add task button clicked to add task to the corresponding row;
findBtnClicked();
// pop up window for task creation;
displayTaskPopUp();
// Check project status and modify button display;
checkProjectStatus();
// Expandable rows;
toggleExpand();
// Check stage position, colour differentiate each row;
colourStage();
// Retrieve quote;
getQuotes();
// Mark project as done;
markStageAsDone();

// This method checks whether the project is mark as completed, if the mark as done button was clicked, it changes the status of the project to complete on both screen, and within local storage, and project homepage.
function checkProjectStatus() {
    let ls = localStorage.getItem('projects');
    ls = JSON.parse(ls);

    // Find the projectEnteredNum (project entered index in the projects list in local storage);
    // After finding the index, changes the status to complete as users requestion by pressing the mark as done button;
    if (ls[localStorage.getItem('projEnteredNum') - 1].status == "complete") {
        markdone.innerHTML = 'Completed';
        markdone.style.backgroundColor = '#6E703D';
    }
}

// Retrieve the projectEnteredNum (project entered index) every time users entered a projec.
function retrieveData() {
    c = localStorage.getItem('projEnteredNum') - 1;
    projTitle.textContent = l[c].title;
}


// Create new task;
function hideTaskForm() {
    newTaskFormPopUp.style.display = 'none';
}

// Info window pops up to intro users to how the roadmap works;
function infoPopUp() {
    if (guide.style.display == 'none') {
        guide.style.display = 'block';
    } else {
        guide.style.display = 'none';
    }
}

// Create a class of Task, later can create objects from the class;
class Task {
    constructor(taskName, taskDueDate, priority, estCompTime) {
        this.taskName = taskName;
        this.taskDueDate = taskDueDate;
        this.priority = priority;
        this.keyword = keyword;
        this.estCompTime = estCompTime;
    }
}

// Send get quotes request everything the window reloads, to display and new quote for users; 
function getQuotes() {
    var request = new XMLHttpRequest();

    request.open('GET', "https://type.fit/api/quotes");

    request.onload = function () {
        // The number of valid quotes is 200, although in the console it printed more than 200 items. Any thing more then 200 is empty;
        let data = JSON.parse(this.response);
        quote.innerHTML = data[Math.floor(Math.random() * data.length)].text
        author.innerHTML = data[Math.floor(Math.random() * data.length)].author;
    }

    request.send();
}


// Task pop up window correspond to the stage button clicked, and add the task to the stage.
function displayTaskPopUp() {
    for (i = 0; i < newTaskBtns.length; i++) {
        newTaskBtns[i].addEventListener("click", function () {
            newTaskFormPopUp.style.display = 'block';
        });
    }
}

// Create new task;
if (newTaskForm) {
    newTaskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let taskName = taskNameInput.value;
        let taskDueDate = taskDueDateInput.value;
        let priority = priorityInput.options[priorityInput.selectedIndex].value;
        let keyword = keywordInput.value;
        let estCompTime = estCompTimeInput.value;
        submitTaskFrom(taskName, taskDueDate, priority, estCompTime, keyword);
    });
}

// Find the add tasks button clicked location (index). 
function findBtnClicked() {
    newTaskBtns = document.querySelectorAll('.newTaskBtn');
    for (var i = 0; i < newTaskBtns.length; i++) {
        newTaskBtns[i].addEventListener('click', function (i) {
            num = i;
        }.bind(null, i));
    }
}


// submit the request to create a task;
function submitTaskFrom(taskName, taskDueDate, priority, estCompTime, keyword) {
    let taskAppend = new Task(taskName, taskDueDate, priority, estCompTime, keyword);

    tasklist.push(taskAppend);
    renderTask(taskAppend);
    console.log(tasklist);
}

// Render the task entered/created in the corresponding stage;
function renderTask(taskAppend) {

    let task = document.createElement('div');
    task.setAttribute('class', 'task');
    task.draggable = "true";

    // task title;
    let taskTitle = document.createElement('h4');
    if (taskAppend.taskName == '') {
        taskTitle.innerHTML = 'Untitled task';
    } else {
        taskTitle.innerHTML = taskAppend.taskName;
    }

    // task priority tag;
    let tagBtn = document.createElement('button');
    tagBtn.setAttribute('id', 'tagBtn');
    tagBtn.innerHTML = taskAppend.priority;
    if (taskAppend.priority == 'high') {
        tagBtn.style.backgroundColor = '#C29F90';
    } else if (taskAppend.priority == 'medium') {
        tagBtn.style.backgroundColor = '#BEB286';
    } else if (taskAppend.priority == 'low') {
        tagBtn.style.backgroundColor = '#6E703D';
    }

    // task due date;
    // Checks tasks due date and estimate completion time, and display according to different situations of inputs;
    let taskDueDate = document.createElement('p');
    if (taskAppend.taskDueDate == '' && taskAppend.estCompTime != '') {
        taskDueDate.innerHTML = taskAppend.estCompTime + ", " + 'No due date';
    } else if (taskAppend.estCompTime == '') {
        taskDueDate.innerHTML = taskAppend.taskDueDate;
    } else if (taskAppend.taskDueDate == '' && taskAppend.estCompTime == '') {
        taskDueDate.innerHTML = 'No date or time';
    } else {
        taskDueDate.innerHTML = taskAppend.estCompTime + ", " + taskAppend.taskDueDate;
    }

    // append all newly created elements into the corresponding place;
    task.appendChild(taskTitle);
    task.appendChild(tagBtn);

    //assign a task keyword(attribute);
    if (taskAppend.keyword != '') {
        let keywordBtn = document.createElement('button');
        keywordBtn.setAttribute('id', 'keywordBtn');
        keywordBtn.innerHTML = taskAppend.keyword.value;
    }
    let keywordBtn = document.createElement('button');
    keywordBtn.setAttribute('id', 'keywordBtn');
    keywordBtn.innerHTML = 'No keyword';

    task.appendChild(keywordBtn);
    task.appendChild(taskDueDate);

    innerList = allStageBoxes[num].querySelector('.innerStageBox');
    innerList.appendChild(task);

    newTaskFormPopUp.style.display = 'none';
    dragNdrop();
}


// create new stage;
var newStageBtn = document.getElementById('newStageBtn');
if (newStageBtn) {
    newStageBtn.addEventListener('click', function (event) {
        event.preventDefault();
        // titleBar
        let titleBar = document.createElement('div');
        titleBar.setAttribute('class', 'titleBar');

        let stageDoneBtn = document.createElement('button');
        stageDoneBtn.setAttribute('id', 'stageCheck');

        // label and input
        let stageInput = document.createElement('div');
        stageInput.setAttribute('class', 'stageInput');

        let stageLabel = document.createElement('label');
        stageLabel.setAttribute('for', 'stagetitle');

        let stageTitleInput = document.createElement('input');
        stageTitleInput.setAttribute('id', 'stageTitle');
        stageTitleInput.setAttribute('placeholder', 'Untitled Stage');

        let toggleIcon = document.createElement('i');
        toggleIcon.setAttribute('class', 'fa fa-caret-up');
        toggleIcon.setAttribute('id', 'close');

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
        stageInput.appendChild(stageDoneBtn);
        titleBar.appendChild(stageInput);
        titleBar.appendChild(toggleIcon);

        innerStageBoxes.appendChild(first);
        innerStageBoxes.appendChild(sec);
        innerStageBoxes.appendChild(third);
        innerStageBoxes.appendChild(newTaskBtn);

        stagecontent.appendChild(innerStageBoxes);
        stages.appendChild(titleBar);
        stages.appendChild(stagecontent);

        expandContent = document.querySelectorAll(".titleBar");

        // update all buttons;
        newTaskBtns = document.querySelectorAll('.newTaskBtn');
        allStageBoxes = document.querySelectorAll('.innerStageBoxes');
        // Enable these methods in the newly created stage;
        findBtnClicked();
        colourStage();
        toggleExpand();
        markStageAsDone();

        // The loop will enable tasks to be created in the correspongind stage;
        for (i = 0; i < newTaskBtns.length; i++) {
            newTaskBtns[i].addEventListener("click", function () {
                newTaskFormPopUp.style.display = 'block';
            });
        }
    });
}


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


markdone.addEventListener('click', function (e) {
    e.preventDefault();
    markAsDone();
});


// Mark project as done and change the project status in local storage.
function markAsDone() {
    var projects = localStorage.getItem('projects');
    projects = JSON.parse(projects);

    markdone.innerHTML = 'Completed';
    markdone.style.backgroundColor = '#6E703D';

    // Find the projectEnteredNum in local storage to change the status of the corresponding item in the project list;
    var index = localStorage.getItem('projEnteredNum');

    projects[index - 1].status = "complete";

    localStorage.setItem('projects', JSON.stringify(projects));
}

// This part doesn't work properly;
var c = 0;
function toggleExpand() {
    expandContent = document.querySelectorAll('.titleBar');
    for (var i = 0; i < expandContent.length; i++) {
        // var toggleIcon = expandContent[i].querySelector('#close');
        // console.log(expandContent[i]);
        // console.log(toggleIcon);

        expandContent[i].addEventListener("click", function () {
            if (c == 0) {
                alert('For marker: This part (toggle expand) doesn\'t work properly, as in when you add new stage, toggle expand is messed up, please leave some hints in the marking comments of how to get it fixed if that is possible. Location: template.js line 346. Thank you!');
                c++;
            }

            // var toggleIcon = document.querySelectorAll('#close');
            // var cursor = document.querySelector('#close');

            this.classList.toggle("expand");

            var stageContent = this.nextElementSibling;
            if (stageContent.style.display == "block") {
                stageContent.style.display = "none";
                // document.getElementById('close').classList.add('fa-caret-down');
                // cursor.setAttribute('class', 'fa fa-caret-down');
            } else {
                stageContent.style.display = "block";
                // cursor = toggleIcon[i];
                // cursor.setAttribute('class', 'fa fa-caret-up');
            }
        });
    }
}

// Assign a colour to the stage rows with even index; It will help users better differentiate the stages;
function colourStage() {
    allStageBoxes = document.querySelectorAll('.innerStageBoxes');
    for (let i = 0; i < allStageBoxes.length; i++) {
        var boxes = allStageBoxes[i].querySelectorAll('.innerStageBox');
        if (i % 2 == 1) {
            for (let j = 0; j < 3; j++) {
                boxes[j].style.backgroundColor = '#EEEEE7';
            }
        }
    }
}


// Mark the stage as done;
// This methods loops through the list, find the stage mark as done button clicked, and mark it as dont;
function markStageAsDone() {
    expandContent = document.querySelectorAll('.titleBar');
    stageDoneBtn = document.querySelectorAll('#stageCheck');
    for (var i = 0; i < stageDoneBtn.length; i++) {
        stageDoneBtn[i].addEventListener('click', function (i) {
            var btn = expandContent[i].querySelector('#stageCheck');

            if (btn.innerHTML == '') {
                btn.innerHTML = '&#x2713';
            } else {
                btn.innerHTML = '';
            }

        }.bind(null, i));
    }
}

// == TESTING BLOCK STARTS == //


// == TESTING BLOCK ENDS == //