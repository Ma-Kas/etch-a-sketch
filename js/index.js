let gridSize = 16; // Initial gridSize definition
let mouseDown = false;
let drawMode = 'draw';


// Get references to DOM elements
const body = document.querySelector('body');
const gridContainer = document.querySelector('.container');
const setGridButton = document.querySelector('#grid-btn');
const clearGridButton = document.querySelector('#clear-btn');
const setDrawModeButton = document.querySelector('#draw-btn');
const setEraserModeButton = document.querySelector('#eraser-btn');
const toggleGridButton = document.querySelector('#toggle-borders-btn');


// Toggle mouseDown variable to enable or disable drawing ability
body.addEventListener('mousedown', () => {
  mouseDown = true;
});

body.addEventListener('mouseup', () => {
  mouseDown = false;
});


// Switch current draw mode based on buttons
setDrawModeButton.addEventListener('click', () => {
  drawMode = 'draw';
});

setEraserModeButton.addEventListener('click', () => {
  drawMode = 'erase';
});


// Toggle display of grid lines
toggleGridButton.addEventListener('click', () => {
  let cells = document.querySelectorAll('.container div');

  for (cell of cells) {
    cell.classList.toggle('cell');
    cell.classList.toggle('cell-borderless');
  }
});


// Get css width of container holding the grid
let containerSize = getComputedStyle(gridContainer).width; // Returns string
containerSize = containerSize.replace("px", ""); // Erase px suffix from string


// Adds number of cells to DOM as per the defined gridSize
function drawGrid(size = gridSize) {
  let cellSize = containerSize / size;
  for (let i = 0; i < (size ** 2); i++) {
    const gridCell = document.createElement('div');

    gridCell.classList.add('cell');
    gridCell.style.cssText = `width: ${cellSize}px; height: ${cellSize}px;`;
    gridContainer.appendChild(gridCell);

    gridCell.addEventListener('mouseover', (e) => {
      colorHoveredCell(e, gridCell)
    });
    gridCell.addEventListener('mousedown', (e) => {
      colorHoveredCell(e, gridCell)
    });
  }
}


// Delete old grid by removing all children(=cells) from grid Container
function deleteGrid() {
  while (gridContainer.firstElementChild) {
    gridContainer.removeChild(gridContainer.firstElementChild)
  }
}


// On mouse over while mousedown, add the hovered class to gridCell
function colorHoveredCell(e, cell) {
    if (e.type === 'mouseover' && !mouseDown) {
      return; // return condition if mouse is not down
    }
    switch (drawMode) {
      case 'draw':
        cell.classList.add('hovered');
        break;
      case 'erase':
        cell.classList.remove('hovered');
        break;
    }
}


// Change grid through button
setGridButton.addEventListener('click', () => {
  let newGridSize = prompt("New Grid Size");
  if (isNaN(newGridSize) || (newGridSize < 1) || (newGridSize > 100)) {
    return;
  } else {
    deleteGrid();
    gridSize = newGridSize;
    drawGrid(gridSize);
  }
});


// Clear current drawing through button
clearGridButton.addEventListener('click', () => {
  let cells = document.querySelectorAll('.cell');

  for (cell of cells) {
    cell.classList.remove('hovered');
  }
})

drawGrid(gridSize);