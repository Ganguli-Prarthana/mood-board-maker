// Get elements
const board = document.getElementById('board');
const boardTitle = document.getElementById('boardTitle');
const addTextBtn = document.getElementById('addTextBtn');
const addImageBtn = document.getElementById('addImageBtn');
const imageUpload = document.getElementById('imageUpload');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

// Make items draggable
function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    element.style.left = (e.clientX - offsetX) + 'px';
    element.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    element.style.zIndex = 1;
  });
}

// Add text button
addTextBtn.addEventListener('click', () => {
  const textDiv = document.createElement('div');
  textDiv.className = 'draggable text-item';
  textDiv.contentEditable = true;
  textDiv.textContent = 'Edit me';
  textDiv.style.left = '100px';
  textDiv.style.top = '100px';
  board.appendChild(textDiv);
  makeDraggable(textDiv);
});

// Add image button
addImageBtn.addEventListener('click', () => {
  imageUpload.click();
});

imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = document.createElement('img');
    img.src = event.target.result;
    img.className = 'draggable image-item';
    img.style.left = '150px';
    img.style.top = '150px';
    board.appendChild(img);
    makeDraggable(img);
  };
  reader.readAsDataURL(file);
});

// Color swatches
document.querySelectorAll('.swatch').forEach(swatch => {
  swatch.style.background = swatch.dataset.color;
  swatch.addEventListener('click', () => {
    const note = document.createElement('div');
    note.className = 'draggable note';
    note.contentEditable = true;
    note.textContent = 'Color note';
    note.style.background = swatch.dataset.color;
    note.style.left = '200px';
    note.style.top = '200px';
    board.appendChild(note);
    makeDraggable(note);
  });
});

// Clear board
clearBtn.addEventListener('click', () => {
  if (confirm('Clear all items?')) {
    board.innerHTML = '';
  }
});

// SAVE TO LIBRARY - FIXED VERSION
saveBtn.addEventListener('click', () => {
  const boardName = boardTitle.textContent || 'Untitled Board';
  
  // Get all board HTML
  const boardHTML = board.innerHTML;
  
  // Get existing boards or create empty array
  const savedBoards = JSON.parse(localStorage.getItem('moodBoards')) || [];
  
  // Add new board
  savedBoards.push({
    name: boardName,
    html: boardHTML,
    date: new Date().toLocaleString()
  });
  
  // Save back to browser
  localStorage.setItem('moodBoards', JSON.stringify(savedBoards));
  
  alert("Saved Library.html");
});

// LOAD SAVED BOARD WHEN COMING FROM LIBRARY - FIXED VERSION
window.addEventListener('DOMContentLoaded', () => {
  const boardIndex = localStorage.getItem('boardToLoad');
  
  if (boardIndex!== null) {
    const savedBoards = JSON.parse(localStorage.getItem('moodBoards')) || [];
    const boardToLoad = savedBoards[boardIndex];
    
    if (boardToLoad) {
      // Put the saved HTML back into the board
      board.innerHTML = boardToLoad.html;
      boardTitle.textContent = boardToLoad.name;
      
      // CRITICAL: Re-attach drag to all loaded items
      document.querySelectorAll('.draggable').forEach(item => {
        makeDraggable(item);
      });
    }
    // LOAD SAVED BOARD WHEN COMING FROM LIBRARY
window.addEventListener('DOMContentLoaded', () => {
  const boardIndex = localStorage.getItem('boardToLoad');
  if (boardIndex!== null) {
    const savedBoards = JSON.parse(localStorage.getItem('moodBoards')) || [];
    const boardToLoad = savedBoards[boardIndex];
    if (boardToLoad) {
      // FIX: Remove broken image tags before inserting HTML
      let safeHTML = boardToLoad.html.replace(/<img[^>]*>/g, '<div class="note" style="background:#ffcccc; padding:20px;">[Image removed - localStorage limit]</div>');

      document.getElementById('board').innerHTML = safeHTML;
      document.getElementById('boardTitle').textContent = boardToLoad.name;
      document.querySelectorAll('.draggable').forEach(item => makeDraggable(item));
    }
    localStorage.removeItem('boardToLoad');
  }
});
    
    // Clear it so it doesn't auto-load next time
    localStorage.removeItem('boardToLoad');
  }
});