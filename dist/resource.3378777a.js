var linkInput = document.getElementById('urlBox');
var urlGetterForm = document.querySelector('.generate-pop-up');
var resourceList = document.querySelector('.resource-list');
var myLink = null;
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
    link.innerHTML = data.url;
    resourceList.appendChild(row);
    row.appendChild(container);
    row.appendChild(summary);
    container.appendChild(img);
    container.appendChild(linkTitle);
    container.appendChild(desp);
    container.appendChild(link);
    linkInput.value = '';
}

//# sourceMappingURL=resource.3378777a.js.map
