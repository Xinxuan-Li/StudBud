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
let projects = [];
let projEnteredNum = 0;
let allLocalProj = localStorage.getItem('projects');
let deleteProjBtns = document.querySelectorAll('#deleteProjBtn');
// Retreive data from storage to display projects saved;
retrieveData();
// Find the project clicked to enter the project page with customised settings;
findProjClicked();
// delete project when bin botton clicked;
deleteProject();
// DEMO TESTING BLOCK HERE STARTS //
// DEMO TESTING BLOCK HERE ENDS //
// Create new project;
class ProjectObj {
    constructor(title, duedate, status){
        this.title = title;
        this.duedate = duedate;
        this.status = status;
    // this.listOfTasks = listOfTasks;
    // this.deliverable = deliverable;
    }
}
function addNewProject() {
    newPopUp.style.display = 'block';
}
function cancelCreateNew() {
    newPopUp.style.display = 'none';
}
// add an event listener first for the new project creation form;
if (newProjectForm) newProjectForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // Check whether project name already exists. 
    var nameIsValid = true;
    let projectName = projectNameInput.value;
    if (projectName == '') {
        nameIsValid = false;
        alert('Please input a name for the project.');
    }
    if (localStorage.getItem('projects') != null) {
        allLocalProj = localStorage.getItem('projects');
        allLocalProj = JSON.parse(allLocalProj);
        for(let i = 0; i < allLocalProj.length; i++)if (projectName == allLocalProj[i].title) {
            alert('Project name already exists, please enter another name');
            nameIsValid = false;
        }
    }
    let projectDueDate = duedateInput.value;
    let projectStatus = statusInput.options[statusInput.selectedIndex].value;
    if (nameIsValid) {
        submitProjForm(projectName, projectDueDate, projectStatus);
        findProjClicked();
    }
});
// add project to the project list.
function submitProjForm(projectName, projectDueDate, projectStatus, projectTasks, pdeliverable) {
    let project = new ProjectObj(projectName, projectDueDate, projectStatus);
    // storing the newly created project to the project list;
    projectListArray.push(project);
    renderProject(project);
}
function updateProjects() {
    if (localStorage.getItem('projects') == null) return;
    let projects1 = localStorage.getItem('projects');
    projects1 = JSON.parse(projects1);
}
// display the project on screen.
function renderProject(project) {
    findProjClicked();
    if (localStorage.getItem('projects') == null) projects = [];
    else {
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
    binIcon.setAttribute('id', 'deleteProjBtn');
    binIcon.setAttribute('onclick', 'window.location.reload()');
    nameBar.appendChild(projectName);
    nameBar.appendChild(binIcon);
    template.appendChild(projectCol);
    projectCol.appendChild(info);
    projectColWrapper.appendChild(template);
    projectColWrapper.appendChild(nameBar);
    projectList.appendChild(projectColWrapper);
    newProjectPopUp.style.display = 'none';
    deleteProjBtns = document.querySelectorAll('#deleteProjBtn');
    deleteProject();
}
// Retrieve data from local storage to display all the created projects.
function retrieveData() {
    let projectList1 = document.querySelectorAll('.projectCol');
    let ls = document.querySelector('.projectList');
    if (projectList1.length == 1) {
        if (localStorage.getItem('projects') != null) {
            let localProjs = localStorage.getItem('projects');
            localProjs = JSON.parse(localProjs);
            for(i = 0; i < localProjs.length; i++){
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
                binIcon.setAttribute('id', 'deleteProjBtn');
                binIcon.setAttribute('onclick', 'window.location.reload()');
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
// Finding the index of the project clicked to entered a customed project template page with the project name;
function findProjClicked() {
    templateHTML = document.querySelectorAll('.templateHTML');
    for(var i1 = 0; i1 < templateHTML.length; i1++)templateHTML[i1].addEventListener('click', (function(i) {
        projEnteredNum = i + 1;
        localStorage.setItem('projEnteredNum', projEnteredNum);
    }).bind(null, i1));
}
// Delete project when the bin button is clicked, through finding the index of bin button, remove the corresponding project, store new list to local storage, reload the site to retrieve data and display modified list. 
function deleteProject() {
    let cursorLs = [];
    allLocalProj = localStorage.getItem('projects');
    allLocalProj = JSON.parse(allLocalProj);
    cursorLs = allLocalProj;
    deleteProjBtns = document.querySelectorAll('#deleteProjBtn');
    for(var i2 = 0; i2 < deleteProjBtns.length; i2++)deleteProjBtns[i2].addEventListener('click', (function(i) {
        cursorLs.splice(i, 1);
        localStorage.setItem('projects', JSON.stringify(cursorLs));
    }).bind(null, i2));
}

//# sourceMappingURL=index.14288483.js.map
