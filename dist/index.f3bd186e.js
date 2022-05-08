// import './components/createNewProject';
// import './components/projectObj';
// import './components/musicPlayerScript';
// import './components/timerScript';
// import './components/resourceScript';
var timer = document.getElementById('timer');
var music = document.getElementById('music');
var addNew = document.getElementById('addProject');
var newPopUp = document.querySelector('.newProjectPopUp');
var projectCol = document.querySelector('.projectCol');
const newProjectForm = document.getElementById('newProjectForm');
const button = document.querySelector("#newProjectForm > button");
var projectList = document.querySelector('.projectList');
var projectListArray = [];
//collecting inputs to create a new project.
var projectNameInput = document.getElementById('projectName');
var statusInput = document.getElementById('status');
var duedateInput = document.getElementById('duedate');
// DEMO TESTING HERE
class ProjectObj {
    constructor(projName, duedate, projStatus){
        this.projName = projName;
        this.duedate = duedate;
        this.projStatus = projStatus;
    }
}
// add an event listener first
newProjectForm.addEventListener("done", function(event) {
    event.preventDefault();
    let projectName = projectNameInput.value;
    let projectDueDate = duedateInput.value;
    let projectStatus = statusInput.options[statusInput.selectedIndex].value;
    addProject(projectName, projectDueDate, projectStatus);
    console.log("here" + projectName);
});
// add project to the project list.
function addNewProject(projectName, projectDueDate, projectStatus) {
    let project = new ProjectObj(projectName, projectDueDate, projectStatus);
    // storing the newly created project to the project list;
    projectListArray.push(project);
    renderProject(project);
    console.log(project);
}
// display the project on screen.
function renderProject(project) {
    // let projectCol = document.createElement('div');
    // assign attribute class to the div element, and name it as 'projectCol';
    // projectCol.setAttribute('class', 'projectCol');
    let title = document.createElement("p");
    title.innerHTML = project.projName;
    let duedate = document.createElement("p");
    duedate.innerHTML = project.duedate;
    let status = document.createElement("p");
    status.innerHTML = project.projStatus;
    projectList.appendChild(projectCol);
    projectCol.appendChild(title);
    projectCol.appendChild(duedate);
    projectCol.appendChild(status);
    console.log(projectListArray);
}
// -------------------------------------------- //
function showTimer() {
    timer.style.display = 'block';
    music.style.display = 'none';
}
function showMusicPlayer() {
    music.style.display = 'block';
    timer.style.display = 'none';
    console.log('clicked!');
}
function hideMusicPlayer() {
    music.style.display = 'none';
}
function hideTimer() {
    timer.style.display = 'none';
}
function addNewProject() {
    newPopUp.style.display = 'block';
}
function cancelCreateNew() {
    newPopUp.style.display = 'none';
}

//# sourceMappingURL=index.f3bd186e.js.map
