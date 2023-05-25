const gridSize = 16; // Initial gridSize definition


// Get references to DOM elements
const gridContainer = document.querySelector('.container');
const setGridButton = document.querySelector('#grid-btn');


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
  }
}

drawGrid(gridSize);


// Delete old grid by removing all children(=cells) from grid Container
function deleteGrid() {
  while (gridContainer.firstElementChild) {
    gridContainer.removeChild(gridContainer.firstElementChild)
  }
}


// On mouse over, add the hovered class to gridCell

// On click
setGridButton.addEventListener('click', () => {
  let newGridSize = prompt("New Grid Size");
  if (isNaN(newGridSize) || (newGridSize < 1) || (newGridSize > 100)) {
    return;
  } else {
    deleteGrid();
    drawGrid(newGridSize);
  }
});