var newPopUp = document.querySelector('.newProjectPopUp');
var projectList = document.querySelector('.projectList');
var newProjectPopUp = document.querySelector('.newProjectPopUp');

var newProjectForm = document.getElementById('newProjectForm');

var projectListArray = [];

//collecting inputs to create a new project.
var projectNameInput = document.getElementById('projectName');
var statusInput = document.getElementById('status');
var duedateInput = document.getElementById('dueDate');
let templateHTML = document.querySelectorAll('.templateHTML');

// local storage items;
let countProj = 1;
let allLocalProj = localStorage.getItem('projects');
allLocalProj = JSON.parse(allLocalProj);
let projects = [];
let projEnteredNum = 1;

// -------------------------------------------- //
function addNewProject() {
    newPopUp.style.display = 'block';
}

function cancelCreateNew() {
    newPopUp.style.display = 'none';
}

// -------------------------------------------- //
retrieveData();
findProjClicked();
// localStorage.getItem('projEnteredNum').replace(projEnteredNum);

// DEMO TESTING BLOCK HERE STARTS //



// DEMO TESTING BLOCK HERE ENDS //



// Create new project;
class ProjectObj {
    constructor(title, duedate, status, sequenceNum) {
        this.title = title;
        this.duedate = duedate;
        this.status = status;
        this.sequenceNum = sequenceNum;
    }
}

// add an event listener first for the new project creation form;
if (newProjectForm) {
    newProjectForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let projectName = projectNameInput.value;
        let projectDueDate = duedateInput.value;
        let projectStatus = statusInput.options[statusInput.selectedIndex].value;
        countProj++;

        submitProjForm(projectName, projectDueDate, projectStatus, countProj);
    });
}



// add project to the project list.
function submitProjForm(projectName, projectDueDate, projectStatus, sequenceNum) {

    let project = new ProjectObj(projectName, projectDueDate, projectStatus, countProj);

    // storing the newly created project to the project list;
    projectListArray.push(project);
    renderProject(project);
}

function updateProjects() {
    if (localStorage.getItem('projects') == null) {
        return;
    }

    let projects = localStorage.getItem('projects');
    projects = JSON.parse(projects);

    for (i = 0; i < projects.length; i++) {
        let key = projects[i].title;
        let value = projects[i].temp;
    }
}

// display the project on screen.
function renderProject(project) {
    if (localStorage.getItem('projects') == null) {
        projects = [];
    } else {
        projects = localStorage.getItem('projects');
        projects = JSON.parse(projects);
    }

    projects.push(project);

    let projectJSON = JSON.stringify(projects);
    localStorage.setItem('projects', projectJSON);
    updateProjects();

    // project.sequenceNum = projects.findIndex();

    let template = document.createElement('a');
    template.setAttribute('href', 'untitled.html');

    //create a div element for projects;
    let projectCol = document.createElement('div');
    projectCol.setAttribute('class', 'projectCol');

    let projectName = document.createElement("p");
    projectName.innerHTML = project.title;

    let projectDueDate = document.createElement("p");
    projectDueDate.innerHTML = "Due date: " + project.duedate;

    let projectStatus = document.createElement("p");
    projectStatus.innerHTML = project.status;

    template.appendChild(projectCol);

    projectCol.appendChild(projectName);
    projectCol.appendChild(projectDueDate);
    projectCol.appendChild(projectStatus);

    projectList.appendChild(template);

    newProjectPopUp.style.display = 'none';
}

function retrieveData() {
    let projectList = document.querySelectorAll('.projectCol');
    let ls = document.querySelector('.projectList');
    if (projectList.length == 1) {
        if (localStorage.getItem('projects') != null) {

            let localProjs = localStorage.getItem('projects');
            localProjs = JSON.parse(localProjs);

            for (i = 0; i < localProjs.length; i++) {
                let template = document.createElement('a');
                template.setAttribute('href', 'untitled.html');
                template.setAttribute('class', 'templateHTML');

                //create a div element for projects;
                let projectCol = document.createElement('div');
                projectCol.setAttribute('class', 'projectCol');

                let projectName = document.createElement("p");
                projectName.innerHTML = localProjs[i].title;

                let projectDueDate = document.createElement("p");
                projectDueDate.innerHTML = "Due date: " + localProjs[i].duedate;

                let projectStatus = document.createElement("p");
                projectStatus.innerHTML = localProjs[i].status;

                template.appendChild(projectCol);

                projectCol.appendChild(projectName);
                projectCol.appendChild(projectDueDate);
                projectCol.appendChild(projectStatus);

                ls.appendChild(template);
            }
        }
    }
}

function findProjClicked() {
    templateHTML = document.querySelectorAll('.templateHTML');
    for (var i = 0; i < templateHTML.length; i++) {
        templateHTML[i].addEventListener('click', function (i) {
            projEnteredNum = i + 1;
            localStorage.setItem('projEnteredNum', projEnteredNum);
        }.bind(null, i));
    }
}
