'use strict';
let BubbleSorter = new BubbleSortDemo({
    element: document.getElementById('container')
});

let errNotification;

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addElement);

let removeBtn = document.getElementById('removeBtn');
removeBtn.addEventListener('click', removeElement);

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', refreshPage);

let go = document.getElementById('go');
go.addEventListener('click', run);

function addElement() {
    BubbleSorter.addElement();
}

function removeElement() {
        try {
            BubbleSorter.removeElement()
        } catch(err) {
            errNotification = new Notification({
                text: err.message
            });
        }
}

function refreshPage() {
    location.reload();
}

function run() {
    if (!BubbleSorter.state) {
        try {
            BubbleSorter.init();
            go.innerHTML = 'Next step';
            addBtn.style.display = 'none';
            removeBtn.style.display = 'none';
        } catch(err) {
            errNotification = new Notification({
                text:err.message
            });
        }
    }

    try {
       BubbleSorter.step();
    } catch(err) {
        errNotification = new Notification({
            text: err.message
        });
    }
}
