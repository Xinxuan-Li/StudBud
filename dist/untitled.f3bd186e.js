// import './components/createNewProject';
// import './components/projectObj';
// import './components/musicPlayerScript';
// import './components/timerScript';
// import './components/resourceScript';
// import './components/homepage';
// import './components/projectpage';
var timer = document.getElementById('timer');
var music = document.getElementById('music');
// addProject is a button
// var addProject = document.getElementById('addProject');
// var createProjectDone = document.getElementById('done');
var newPopUp = document.querySelector('.newProjectPopUp');
var projectList = document.querySelector('.projectList');
var newProjectPopUp = document.querySelector('.newProjectPopUp');
var newProjectForm = document.getElementById('newProjectForm');
var projectListArray = [];
//collecting inputs to create a new project.
var projectNameInput = document.getElementById('projectName');
var statusInput = document.getElementById('status');
var duedateInput = document.getElementById('dueDate');
// -------------------------------------------- //
function showTimer() {
    timer.style.display = 'block';
    music.style.display = 'none';
}
function hideTimer() {
    timer.style.display = 'none';
}
function showMusicPlayer() {
    music.style.display = 'block';
    timer.style.display = 'none';
    console.log('clicked!');
}
function hideMusicPlayer() {
    music.style.display = 'none';
}
function addNewProject() {
    newPopUp.style.display = 'block';
}
function cancelCreateNew() {
    newPopUp.style.display = 'none';
}
// --------------------------------- //
// DEMO TESTING HERE
class ProjectObj {
    constructor(title, duedate, status){
        this.title = title;
        this.duedate = duedate;
        this.status = status;
    }
}
// add an event listener first
if (newProjectForm) newProjectForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let projectName = projectNameInput.value;
    let projectDueDate = duedateInput.value;
    let projectStatus = statusInput.options[statusInput.selectedIndex].value;
    submitProjForm(projectName, projectDueDate, projectStatus);
});
// add project to the project list.
function submitProjForm(projectName, projectDueDate, projectStatus) {
    let project = new ProjectObj(projectName, projectDueDate, projectStatus);
    // storing the newly created project to the project list;
    projectListArray.push(project);
    renderProject(project);
}
// display the project on screen.
function renderProject(project) {
    //create a div element for projects;
    let projectCol = document.createElement('div');
    projectCol.setAttribute('class', 'projectCol');
    let projectName = document.createElement("p");
    projectName.innerHTML = project.title;
    let projectDueDate = document.createElement("p");
    projectDueDate.innerHTML = "Due date: " + project.duedate;
    let projectStatus = document.createElement("p");
    projectStatus.innerHTML = project.status;
    projectCol.appendChild(projectName);
    projectCol.appendChild(projectDueDate);
    projectCol.appendChild(projectStatus);
    projectList.appendChild(projectCol);
    newProjectPopUp.style.display = 'none';
}
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
    constructor(taskName, taskDueDate, priority, estCompTime){
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
for(i = 0; i < newTaskBtns.length; i++)newTaskBtns[i].addEventListener("click", function() {
    newTaskFormPopUp.style.display = 'block';
});
newTaskForm.addEventListener("submit", function(event) {
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
    let task1 = document.createElement('div');
    task1.setAttribute('class', 'task');
    task1.draggable = "true";
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
    task1.appendChild(menuEllipses);
    task1.appendChild(taskTitle);
    task1.appendChild(tagBtn);
    task1.appendChild(taskDueDate);
    innerList.append(task1);
    tasks = document.querySelectorAll('.task');
    console.log(tasks);
    newTaskFormPopUp.style.display = 'none';
    for(let i = 0; i < tasks.length; i++){
        const item = tasks[i];
        item.addEventListener('dragstart', function() {
            draggedItem = item;
            setTimeout(function() {
                draggedItem.style.display = 'none';
            }, 0);
        });
        item.addEventListener('dragend', function() {
            setTimeout(function() {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
        for(let j = 0; j < list.length; j++){
            const ls = list[j];
            ls.addEventListener('dragover', function(event) {
                event.preventDefault();
            });
            ls.addEventListener('dragenter', function(event) {
                event.preventDefault();
            });
            ls.addEventListener('drop', function(event) {
                this.append(draggedItem);
            });
        }
    }
// ******** Dragging event script ends **** //
}

//# sourceMappingURL=untitled.f3bd186e.js.map
