
const libraryGrid = document.getElementById('libraryGrid');
const savedBoards = JSON.parse(localStorage.getItem('moodBoards')) || [];

if (savedBoards.length === 0) {
  libraryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No boards saved yet. Go make one!</p>';
} else {
  savedBoards.forEach((board, index) => {
    const boardCard = document.createElement('div');
    boardCard.className = 'saved-board';
    
    boardCard.addEventListener('click', () => {
      localStorage.setItem('boardToLoad', index);
      window.location.href = 'index.html';
    });
    
    boardCard.innerHTML = `
      <div class="board-thumb">Click to Open</div>
      <h3>${board.name}</h3>
      <p style="font-size:12px; color:#666;">Saved: ${board.date}</p>
      <button onclick="event.stopPropagation(); deleteBoard(${index})" class="btn btn-red" style="margin-top:10px;">Delete</button>
    `;
    libraryGrid.appendChild(boardCard);
  });
}

function deleteBoard(index) {
  if (confirm('Delete this board?')) {
    savedBoards.splice(index, 1);
    localStorage.setItem('moodBoards', JSON.stringify(savedBoards));
    location.reload();
  }
}