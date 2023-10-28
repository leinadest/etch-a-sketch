let mouseIsDown;
let mode = 'draw';
const grid = document.querySelector('.grid');

function createCell(width, parent) {
    let cell = document.createElement('div');
    cell.style.width = width;
    cell.style.height = width;
    cell.style.boxSizing = 'border-box';
    cell.style.flex = 'none';
    cell.style.userSelect = 'none';
    cell.classList.add('cell');
    cell.addEventListener('mouseover', () => {
        if (mouseIsDown && mode == 'draw') {
            let brushColor = document.querySelector('input').value;
            cell.style.backgroundColor = brushColor;
        }
        if (mouseIsDown && mode == 'eraser') {
            cell.style.backgroundColor = 'rgb(255, 255, 255)';
        }
    });
    parent.appendChild(cell);
}

function setGrid(size) {
    grid.replaceChildren();
    let cellWidth = 100 / size + '%';
    for (let i = 0; i < size**2; i++) {
        createCell(cellWidth, grid);
    }
}

function resizeGrid() {
    const gridContainer = document.querySelector('.grid-container');
    setInterval(() => {
        let width = this.getComputedStyle(gridContainer).getPropertyValue('width');
        let height = this.getComputedStyle(gridContainer).getPropertyValue('height');
        grid.style.width = Math.min(parseInt(width), parseInt(height)) - 50 + 'px';
        grid.style.height = Math.min(parseInt(width), parseInt(height)) - 50 + 'px';
    }, 100);
}

let gridBtn = document.querySelector('.grid-button');
gridBtn.addEventListener('click', () => {
    setGrid(prompt('Choose the number of grid cells on each side'));
});

let drawBtn = document.querySelector('.draw');
drawBtn.addEventListener('click', () => mode = 'draw');

let eraserBtn = document.querySelector('.eraser');
eraserBtn.addEventListener('click', () => mode = 'eraser');

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    grid.childNodes.forEach(cell => cell.style.backgroundColor = 'rgb(255, 255, 255)');
});

document.addEventListener('mousedown', (e) => {
    if (mouseIsDown == false) {
        mouseIsDown = true;
    }
});
document.addEventListener('mouseup', (e) => {
    mouseIsDown = false;
});

window.addEventListener('resize', resizeGrid);

resizeGrid();