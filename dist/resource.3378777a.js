var linkInput = document.getElementById('urlBox');
var urlGetterForm = document.querySelector('.generate-pop-up');
var resourceList = document.querySelector('.resource-list');
var rows = document.querySelector('.row');
var summaries = document.querySelector('.summaryField');
var myLink = null;
// storing in local storage variables;
let resourceListArray = [];
let resources = [];
class ResourceObj {
    constructor(data, summary){
        this.data = data;
        this.summary = summary;
    }
}
retreiveLocalRes();
// get request if link input is not empty;
var request = new XMLHttpRequest();
if (urlGetterForm) urlGetterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (linkInput.value != '') {
        myLink = linkInput.value;
        request.open('GET', "http://api.linkpreview.net/?key=cb651c5031e16f0a587326b66a8c8e20&q=" + myLink);
        request.onload = function() {
            let data = JSON.parse(this.response);
            generatePreview(data);
            console.log(data);
        };
        request.send();
    }
});
// generate a preview of the url;
function generatePreview(data) {
    let row = document.createElement('div');
    row.setAttribute('class', 'resource-list-row');
    let container = document.createElement('div');
    container.setAttribute('class', 'resource-content');
    let summary = document.createElement('div');
    summary.setAttribute('class', 'summary');
    let summaryField = document.createElement('textarea');
    summaryField.setAttribute('placeholder', 'Type your summary here...');
    summaryField.setAttribute('id', 'summaryField');
    summary.appendChild(summaryField);
    let img = document.createElement('img');
    img.setAttribute('src', data.image);
    let linkTitle = document.createElement('h2');
    linkTitle.innerHTML = data.title;
    let desp = document.createElement('p');
    desp.innerHTML = data.description;
    let link = document.createElement('p');
    let linkTo = document.createElement('a');
    link.innerHTML = data.url;
    linkTo.setAttribute('href', data.url);
    resourceList.appendChild(row);
    row.appendChild(linkTo);
    row.appendChild(summary);
    linkTo.appendChild(container);
    container.appendChild(img);
    container.appendChild(linkTitle);
    container.appendChild(desp);
    container.appendChild(link);
    linkInput.value = '';
    let reObj = new ResourceObj(data, summaryField.value);
    resources.push(reObj);
    let resourcesJSON = JSON.stringify(resources);
    localStorage.setItem('resources', resourcesJSON);
}
function updateResources() {
// store 'data' obj into local storage 'resources' list;
}
function retreiveLocalRes() {
    let allRes = document.querySelectorAll('.resource-list');
    if (localStorage.getItem('resources') != null) {
        let localRes = localStorage.getItem('resources');
        localRes = JSON.parse(localRes);
        console.log('here');
        for(let i = 0; i < localRes.length; i++){
            let row = document.createElement('div');
            row.setAttribute('class', 'resource-list-row');
            let container = document.createElement('div');
            container.setAttribute('class', 'resource-content');
            let summary = document.createElement('div');
            summary.setAttribute('class', 'summary');
            let summaryField = document.createElement('textarea');
            summaryField.setAttribute('placeholder', 'Type your summary here...');
            summaryField.setAttribute('id', 'summaryField');
            summary.appendChild(summaryField);
            let img = document.createElement('img');
            img.setAttribute('src', localRes[i].data.image);
            let linkTitle = document.createElement('h2');
            linkTitle.innerHTML = localRes[i].title;
            let desp = document.createElement('p');
            desp.innerHTML = localRes[i].data.description;
            let link = document.createElement('p');
            let linkTo = document.createElement('a');
            link.innerHTML = localRes[i].data.url;
            linkTo.setAttribute('href', localRes[i].data.url);
            resourceList.appendChild(row);
            row.appendChild(linkTo);
            row.appendChild(summary);
            linkTo.appendChild(container);
            container.appendChild(img);
            container.appendChild(linkTitle);
            container.appendChild(desp);
            container.appendChild(link);
        }
    }
}

//# sourceMappingURL=resource.3378777a.js.map
