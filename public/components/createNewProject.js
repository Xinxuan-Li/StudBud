var projectList = document.getElementById('projectList');
const allProjects = document.getElementById('allProjects');

var projectNameInput = document.getElementById('projectName');
var statusInput = document.getElementById('status');
var duedateInput = document.getElementById('duedate');
var projectListArray = [];

// add an event listener first
allProjects.addEventListener("submit", function (event) {
    event.preventDefault();
    let project = projectNameInput.value;
    let pDueDate = duedateInput.value;
    let pStatus = statusInput.value;
    if (project) {
        addProject(project, pDueDate, pStatus);
    }
});

function addProject(pName, pDueDate, pStatus) {
    let d = new Date();
    let dateCreated = d.getFullYear();
    let project = {
        id: Date.now(),
        pName,
        pDueDate,
        pStatus
    }
    // storing the newly created project to the project list
    projectListArray.push(project);
    renderProject(project);
}

function renderProject(project) {
    let projectPreview = document.createElement('div');
    projectPreview.setAttribute('item', projectPreview.id);

    let title = document.createElement('p');
    title.innerHTML = project.projName;

    let duedate = document.createElement('p');
    duedate.innerHTML = project.duedate;

    let status = document.createElement('p');
    status.innerHTML = project.projStatus;

    projectPreview.appendChild(title);
    projectPreview.appendChild(duedate);
    projectPreview.appendChild(status);
    projectList.appendChild(projectPreview);
}

// -------------------------------------------- //
function showTimer() {
    var timer = document.getElementById('timer');
    var music = document.getElementById('music');
    timer.style.display = 'block';
    music.style.display = 'none';
}

function showMusicPlayer() {
    var timer = document.getElementById('timer');
    var music = document.getElementById('music');
    music.style.display = 'block';
    timer.style.display = 'none';
    console.log('clicked!');
}

function hideMusicPlayer() {
    var music = document.getElementById('music');
    music.style.display = 'none';
}

function hideTimer() {
    var timer = document.getElementById('timer');
    timer.style.display = 'none';
}

function cancelCreateNew() {
}