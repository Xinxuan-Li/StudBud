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
let countProj = 0;
let allLocalProj = localStorage.getItem('projects');
allLocalProj = JSON.parse(allLocalProj);
let projects = [];
let projEnteredNum = 0;

// -------------------------------------------- //
function addNewProject() {
    newPopUp.style.display = 'block';
}

function cancelCreateNew() {
    newPopUp.style.display = 'none';
}

// -------------------------------------------- //
// Retreive data from storage to display projects saved;
retrieveData();
// Find the project clicked to enter the project page with customised settings;
findProjClicked();

// DEMO TESTING BLOCK HERE STARTS //



// DEMO TESTING BLOCK HERE ENDS //



// Create new project;
class ProjectObj {
    constructor(title, duedate, status) {
        this.title = title;
        this.duedate = duedate;
        this.status = status;
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
        findProjClicked();
    });
}



// add project to the project list.
function submitProjForm(projectName, projectDueDate, projectStatus) {

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
}

// display the project on screen.
function renderProject(project) {
    findProjClicked();
    if (localStorage.getItem('projects') == null) {
        projects = [];
    } else {
        projects = localStorage.getItem('projects');
        projects = JSON.parse(projects);
    }

    // Append project object into the storage list;
    projects.push(project);

    let projectColWrapper = document.createElement('div');
    projectColWrapper.setAttribute('class', 'projectColWrapper');

    let projectJSON = JSON.stringify(projects);
    localStorage.setItem('projects', projectJSON);
    updateProjects();

    let template = document.createElement('a');
    template.setAttribute('href', 'untitled.html');
    template.setAttribute('class', 'templateHTML');

    //create a div element for projects;
    let projectCol = document.createElement('div');
    projectCol.setAttribute('class', 'projectCol');

    let projectDueDate = document.createElement("p");
    projectDueDate.innerHTML = "Due date: " + project.duedate;

    let projectStatus = document.createElement("p");
    projectStatus.innerHTML = project.status;

    let nameBar = document.createElement('div');
    nameBar.setAttribute('class', 'nameBar');

    let projectName = document.createElement("p");
    projectName.innerHTML = project.title;

    let info = document.createElement('div');
    info.setAttribute('class', 'info');
    info.appendChild(projectDueDate);
    info.appendChild(projectStatus);

    let binIcon = document.createElement('i');
    binIcon.setAttribute('class', 'fa fa-trash-o');

    nameBar.appendChild(projectName);
    nameBar.appendChild(binIcon);

    template.appendChild(projectCol);
    projectCol.appendChild(info);

    projectColWrapper.appendChild(template);
    projectColWrapper.appendChild(nameBar);

    projectList.appendChild(projectColWrapper);

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

                let projectColWrapper = document.createElement('div');
                projectColWrapper.setAttribute('class', 'projectColWrapper');

                //create a div element for projects;
                let projectCol = document.createElement('div');
                projectCol.setAttribute('class', 'projectCol');

                let projectDueDate = document.createElement("p");
                projectDueDate.innerHTML = "Due date: " + localProjs[i].duedate;

                let projectStatus = document.createElement("p");
                projectStatus.innerHTML = localProjs[i].status;

                let nameBar = document.createElement('div');
                nameBar.setAttribute('class', 'nameBar');

                let projectName = document.createElement("p");

                projectName.innerHTML = localProjs[i].title;

                let binIcon = document.createElement('i');
                binIcon.setAttribute('class', 'fa fa-trash-o');

                let info = document.createElement('div');
                info.setAttribute('class', 'info');
                info.appendChild(projectDueDate);
                info.appendChild(projectStatus);

                nameBar.appendChild(projectName);
                nameBar.appendChild(binIcon);

                template.appendChild(projectCol);
                projectCol.appendChild(info);

                projectColWrapper.appendChild(template);
                projectColWrapper.appendChild(nameBar);

                ls.appendChild(projectColWrapper);
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

function deleteProject() {

}
