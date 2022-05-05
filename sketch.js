const container = document.querySelector('#sketch-container');
let isMouseDown = false;

function drawListener(e) {
    if (isMouseDown) {
        this.style.backgroundColor = 'black';
    }
}

function resize(e) {
    let columns = window.prompt("Width?", 64);
    let rows = window.prompt("Height?", 64);

    // don't do anything if user presses "cancel" on prompt
    if (columns === null || rows === null) return;

    if (columns > 100) columns = 100;
    if (rows > 100) rows = 100;

    createSketchBox(columns, rows);
}

function reset(e) {
    let nodes = document.querySelectorAll('.sketch-node');
    nodes.forEach(node => node.style.backgroundColor = 'white');
}

function createSketchBox(columns, rows) {
    // clear board if it exists
    let existingNodes = document.querySelectorAll('.sketch-row');
    if (existingNodes) {
        existingNodes.forEach(node => {
            container.removeChild(node);
        });
    }

    for (let i = 0; i < rows; i++) {
        let row = document.createElement('div');
        row.classList.add('sketch-row');

        for (let j = 0; j < columns; j++) {
            let pixel = document.createElement('div');
            pixel.classList.add('sketch-node');
            row.appendChild(pixel);
        }

        container.appendChild(row);
    }

    addListenersToNodes();
}

function addListenersToNodes() {
    let pixels = document.querySelectorAll('.sketch-node');
    
    pixels.forEach(pixel => 
            pixel.addEventListener('mouseenter', drawListener));

    // click listener in case user wants to color just one pixel
    pixels.forEach(pixel => pixel.addEventListener('click', 
            e => pixel.style.backgroundColor = 'black'));
}

createSketchBox(64, 64);

let resizeButton = document.querySelector('#resize');
resizeButton.addEventListener('click', resize);

let resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset);

container.addEventListener('mousedown', e => isMouseDown = true);
container.addEventListener('mouseup', e => isMouseDown = false);