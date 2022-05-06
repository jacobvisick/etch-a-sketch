const container = document.querySelector('#sketch-container');
let isMouseDown = false;

function drawListener(e) {
    if (isMouseDown) {
        this.style.backgroundColor = 'black';
    }
}

function resize(e) {
    let size = window.prompt("Please enter a new size", 64);

    // don't do anything if user presses "cancel" on prompt
    if (size === null) return;

    // ensure the number isn't too high
    if (size > 100) size = 100;

    if (isNaN(size)) {
        alert("Please enter a valid number");
        return;
    }

    createSketchBox(size);
}

function reset(e) {
    let sketchBox = document.querySelector('#container');
    sketchBox.classList.add('shake');
    sketchBox.addEventListener('animationend', e =>
            sketchBox.classList.remove('shake'));

    let nodes = document.querySelectorAll('.wipe');
    nodes.forEach(node => node.style.backgroundColor = 'white');
}

function createSketchBox(size) {
    // clear board if it exists
    let existingNodes = document.querySelectorAll('.sketch-row');
    if (existingNodes) {
        existingNodes.forEach(node => {
            container.removeChild(node);
        });
    }

    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('sketch-row');

        for (let j = 0; j < size; j++) {
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

            // prevent pixels from being draggable
            pixel.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

createSketchBox(64);

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