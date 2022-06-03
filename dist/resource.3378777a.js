// generating a preview of the URL inputted vairables, used with API linkPreview to create one resource box with title, image(if accessible), short description, and URL itself;
var linkInput = document.getElementById('urlBox');
var urlGetterForm = document.querySelector('.generate-pop-up');
var resourceList = document.querySelector('.resource-list');
var rows = document.querySelector('.row');
var summaries = document.querySelector('#summaryField');
var allSum = document.querySelectorAll('#summaryField');
var saveSum = document.querySelector('.fa-save');
var myLink = null;
// Assign tags to specific resource variables;
var leftCols = document.querySelectorAll('.leftCol');
var tagResInput = document.querySelectorAll('#tagResInput');
var sendTagBtn = document.querySelectorAll('#sendTagBtn');
var alltags = document.querySelectorAll('.alltags');
// storing in local storage variables;
let resources = [];
class ResourceObj {
    constructor(data, summary, tags){
        this.data = data;
        this.summary = summary;
        this.tags = tags;
    }
}
// Methods to run everytime the window loads;
// Retrieve data of resources list;
retreiveLocalRes();
// Add tags to the resource
assignTag();
// get request if link input is not empty;
var request = new XMLHttpRequest();
if (urlGetterForm) urlGetterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Check whether there are content within the input box. If content is valid, users can send the request by hitting enter;
    if (linkInput.value != '') {
        myLink = linkInput.value;
        request.open('GET', "http://api.linkpreview.net/?key=cb651c5031e16f0a587326b66a8c8e20&q=" + myLink);
        // Load data retrieved;
        request.onload = function() {
            let data = JSON.parse(this.response);
            generatePreview(data);
        };
        request.send();
    }
});
// generate a preview of the url;
function generatePreview(data) {
    let row = document.createElement('div');
    row.setAttribute('class', 'resource-list-row');
    // leftCol represents the left column of each row: preview box, tags and tags creation box;
    let leftCol = document.createElement('div');
    leftCol.setAttribute('class', 'leftCol');
    let container = document.createElement('div');
    container.setAttribute('class', 'resource-content');
    // All tags created will be stored here, and display on the screen;
    let alltags1 = document.createElement('div');
    alltags1.setAttribute('class', 'alltags');
    // Input tag content within;
    let tagResInput1 = document.createElement('input');
    tagResInput1.setAttribute('id', 'tagResInput');
    tagResInput1.setAttribute('placeholder', 'Assign me a tag');
    // Send tag creation button;
    let sendTag = document.createElement('button');
    sendTag.setAttribute('id', 'sendTagBtn');
    sendTag.setAttribute('type', "submit");
    let sendIcon = document.createElement('i');
    sendIcon.setAttribute('class', 'fa fa-paper-plane-o');
    let tagInputBar = document.createElement('div');
    tagInputBar.setAttribute('class', 'tagInputBar');
    // Create input summary here;
    let summary = document.createElement('div');
    summary.setAttribute('class', 'summary');
    let summaryField = document.createElement('textarea');
    summaryField.setAttribute('placeholder', 'Type your summary here...');
    summaryField.setAttribute('id', 'summaryField');
    summary.appendChild(summaryField);
    let attributeBtn = document.createElement('button');
    attributeBtn.setAttribute('id', 'attributeBtn');
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
    container.appendChild(img);
    container.appendChild(linkTitle);
    container.appendChild(desp);
    container.appendChild(link);
    linkTo.appendChild(container);
    sendTag.appendChild(sendIcon);
    tagInputBar.appendChild(tagResInput1);
    tagInputBar.appendChild(sendTag);
    leftCol.appendChild(linkTo);
    leftCol.appendChild(alltags1);
    leftCol.appendChild(tagInputBar);
    row.appendChild(leftCol);
    row.appendChild(summary);
    resourceList.appendChild(row);
    linkInput.value = '';
    // store it in local storage;
    let reObj = new ResourceObj(data, '', []);
    resources.push(reObj);
    console.log(resources);
    if (localStorage.getItem('resources') != null) {
        let ls = localStorage.getItem('resources');
        ls = JSON.parse(ls);
        ls.push(reObj);
        localStorage.setItem('resources', JSON.stringify(ls));
    }
    window.location.reload();
}
// Retrieve resource data from local storage, through going through the list and check whether summary is inputed. 
function retreiveLocalRes() {
    if (localStorage.getItem('resources') != null) {
        let localRes = localStorage.getItem('resources');
        localRes = JSON.parse(localRes);
        for(let i = 0; i < localRes.length; i++){
            let row = document.createElement('div');
            row.setAttribute('class', 'resource-list-row');
            let leftCol = document.createElement('div');
            leftCol.setAttribute('class', 'leftCol');
            let container = document.createElement('div');
            container.setAttribute('class', 'resource-content');
            let tagResInput2 = document.createElement('input');
            tagResInput2.setAttribute('id', 'tagResInput');
            tagResInput2.setAttribute('placeholder', 'Assign me a tag');
            let tagInputBar = document.createElement('div');
            tagInputBar.setAttribute('class', 'tagInputBar');
            let alltags2 = document.createElement('div');
            alltags2.setAttribute('class', 'alltags');
            if (localRes[i].tags != []) for(let j = 0; j < localRes[i].tags.length; j++){
                let resTag = document.createElement('div');
                resTag.setAttribute('id', 'resTag');
                resTag.innerHTML = localRes[i].tags[j];
                alltags2.appendChild(resTag);
            }
            let sendTag = document.createElement('button');
            sendTag.setAttribute('type', "submit");
            sendTag.setAttribute('id', 'sendTagBtn');
            let sendIcon = document.createElement('i');
            sendIcon.setAttribute('class', 'fa fa-paper-plane-o');
            let summary = document.createElement('div');
            summary.setAttribute('class', 'summary');
            let summaryField = document.createElement('textarea');
            if (localRes[i].summary == "") summaryField.setAttribute('placeholder', 'Type your summary here...');
            else summaryField.value = localRes[i].summary;
            summaryField.setAttribute('id', 'summaryField');
            summary.appendChild(summaryField);
            let img = document.createElement('img');
            img.setAttribute('src', localRes[i].data.image);
            let linkTitle = document.createElement('h2');
            linkTitle.innerHTML = localRes[i].data.title;
            let desp = document.createElement('p');
            desp.innerHTML = localRes[i].data.description;
            let link = document.createElement('p');
            let linkTo = document.createElement('a');
            link.innerHTML = localRes[i].data.url;
            linkTo.setAttribute('href', localRes[i].data.url);
            container.appendChild(img);
            container.appendChild(linkTitle);
            container.appendChild(desp);
            container.appendChild(link);
            linkTo.appendChild(container);
            sendTag.appendChild(sendIcon);
            tagInputBar.appendChild(tagResInput2);
            tagInputBar.appendChild(sendTag);
            leftCol.appendChild(linkTo);
            leftCol.appendChild(alltags2);
            leftCol.appendChild(tagInputBar);
            row.appendChild(leftCol);
            row.appendChild(summary);
            resourceList.appendChild(row);
        }
    } else {
        let resourcesJSON = JSON.stringify(resources);
        localStorage.setItem('resources', resourcesJSON);
    }
}
// When the save button clicked, all summaries typed will be saved into the local storage, and display again next time users come back to the page. 
saveSum.addEventListener('click', function(e) {
    e.preventDefault();
    saveSummary();
});
// Saves summary input;
function saveSummary() {
    allSum = document.querySelectorAll('#summaryField');
    let resourceListArray = [];
    let list = localStorage.getItem('resources');
    list = JSON.parse(list);
    resourceListArray = list;
    for(let i = 0; i < list.length; i++)resourceListArray[i].summary = allSum[i].value;
    localStorage.setItem('resources', JSON.stringify(resourceListArray));
}
// Assign a tag to each resource, and store it inside local storage for later display;
function assignTag() {
    leftCols = document.querySelectorAll('.leftCol');
    tagResInput = document.querySelectorAll('#tagResInput');
    sendTagBtn = document.querySelectorAll('#sendTagBtn');
    let list = localStorage.getItem('resources');
    list = JSON.parse(list);
    let cursorLs = [];
    for(let i1 = 0; i1 < leftCols.length; i1++)sendTagBtn[i1].addEventListener('click', (function(i) {
        var exist = false;
        cursorLs = list[i].tags;
        alltags = leftCols[i].querySelector('.alltags');
        // Check whether the tag exists already, if not, they can create one, if it is exists, alert window pops up to ask people to rename it;
        if (tagResInput[i].value != '') {
            for(let j = 0; j < cursorLs.length; j++)if (tagResInput[i].value == cursorLs[j]) {
                exist = true;
                alert('Tag already exist, give it another name.');
                break;
            }
            // If it doesn't exists, continue sending the tag creation request;
            if (exist == false) {
                cursorLs.push(tagResInput[i].value);
                let resTag = document.createElement('button');
                resTag.setAttribute('id', 'resTag');
                resTag.innerHTML = tagResInput[i].value;
                alltags.appendChild(resTag);
                tagResInput[i].value = '';
                // Put updated tag ls into local storage;
                list[i].tags = cursorLs;
                localStorage.setItem('resources', JSON.stringify(list));
            }
        }
    }).bind(null, i1));
}

//# sourceMappingURL=resource.3378777a.js.map
