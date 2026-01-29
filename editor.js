const editor = document.getElementById("editor");
const wordCountEl = document.getElementById("wordCount");
const charCountEl = document.getElementById("charCount");
const pageCountEl = document.getElementById("pageCount");
const docTitle = document.getElementById("docTitle");


let hasChanges = false;
let autoSaveTimer;

editor.addEventListener("input", () => {
  updateStats();
  markAsChanged();
});

editor.addEventListener("keyup", () => {
  updateStats();
});

function updateStats() {
  const text = editor.innerText.trim();
  const html = editor.innerHTML;
  
  
  const words = text ? text.split(/\s+/).length : 0;
  wordCountEl.textContent = words;
  
  
  const chars = text.length;
  charCountEl.textContent = chars;
  
  
  const pages = Math.ceil(words / 250) || 1;
  pageCountEl.textContent = pages;
}

function markAsChanged() {
  hasChanges = true;
  const saveStatus = document.getElementById("saveStatus");
  saveStatus.innerHTML = '<i class="fas fa-circle"></i> Unsaved';
  saveStatus.style.color = "#f59e0b";
  
  
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    autoSaveDocument();
  }, 3000);
}

updateStats();