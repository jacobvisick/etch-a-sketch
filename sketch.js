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

    // ensure the number isn't too high
    if (columns > 100) columns = 100;
    if (rows > 100) rows = 100;

    if (isNaN(columns) || isNaN(rows)) {
        alert("Please enter a valid number");
        return;
    }

    createSketchBox(columns, rows);
}

function reset(e) {
    let sketchBox = document.querySelector('#container');
    sketchBox.classList.add('shake');
    sketchBox.addEventListener('animationend', e =>
            sketchBox.classList.remove('shake'));

    let nodes = document.querySelectorAll('.wipe');
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
    
    pixels.forEach(pixel => {
            pixel.addEventListener('mouseenter', drawListener)
            pixel.addEventListener('click', e => {
                pixel.style.backgroundColor = 'black';
                // add wipe class with short delay so it doesn't animate
                setTimeout(() => pixel.classList.add('wipe'), 500);
            });
            pixel.addEventListener('transitionend', e => 
                    pixel.classList.remove('wipe'));
    });
}

createSketchBox(64, 64);

let resizeButton = document.querySelector('#resize');
resizeButton.addEventListener('click', resize);

let resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset);

container.addEventListener('mousedown', e => isMouseDown = true);
container.addEventListener('mouseup', e => { 
    isMouseDown = false

    // apply wipe class to all nodes that have been filled
    // makes the first "reset" transition a little smoother
    let pixels = document.querySelectorAll('.sketch-node');
    pixels.forEach(pixel => {
        if (pixel.style.backgroundColor === 'black') {
            pixel.classList.add('wipe');
        }
    })
});