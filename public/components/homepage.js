var timer = document.getElementById('timer');
var music = document.getElementById('music');
// addProject is a button
// var addProject = document.getElementById('addProject');
// var createProjectDone = document.getElementById('done');

var newPopUp = document.querySelector('.newProjectPopUp');
var projectList = document.querySelector('.projectList');
var newProjectPopUp = document.querySelector('.newProjectPopUp');

const newProjectForm = document.getElementById('newProjectForm');

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
    constructor(title, duedate, status) {
        this.title = title;
        this.duedate = duedate;
        this.status = status;
    }
}

// add an event listener first
newProjectForm.addEventListener("submit", function (event) {
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