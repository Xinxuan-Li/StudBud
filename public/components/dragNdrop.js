const task = document.querySelectorAll('.task');
const list = document.querySelectorAll('.innerStageBox');

console.log(task);

let draggedItem = null;

for (let i = 0; i < task.length; i++) {
    const item = task[i];

    item.addEventListener('dragstart', function () {
        draggedItem = item;
        console.log(item);
        setTimeout(function () {
            this.style.display = 'none';
        }, 0);
    });

    item.addEventListener('dragend', function () {
        setTimeout(function () {
            draggedItem.style.display('block');
            draggedItem = null;
        }, 0);

    });

    for (let j = 0; j < list.length; j++) {
        const ls = list[j];

        ls.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        ls.addEventListener('dragenter', function (event) {
            event.preventDefault();
        });

        ls.addEventListener('drop', function (event) {
            console.log('drop');
            this.append(draggedItem);
        });
    }
}
// function allowDrop(allowdropevent) {
//     allowdropevent.preventDefault();
// }

// function drag(dragevent) {
//     dragevent.dataTransfer.setData("text", dragevent.target.id);
//     // console.log(dragevent.target.id);
// }

// function drop(dropevent) {
//     dropevent.preventDefault();
//     var data = dropevent.dataTransfer.getData("text");
//     console.log(data);
//     dropevent.target.appendChild(document.getElementById(data));
// }