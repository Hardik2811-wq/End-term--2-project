
const settingsBtn = document.getElementById("settingsBtn");


settingsBtn.addEventListener("click", () => {
  alert("Settings panel coming soon!\n\n• Theme switching\n• Font preferences\n• Auto-save interval\n• Default margins");
});


let currentPage = 1;
let totalPages = 1;

editor.addEventListener("click", updateCursorPosition);
editor.addEventListener("keyup", updateCursorPosition);

function updateCursorPosition() {
  const range = window.getSelection().getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(editor);
  preRange.setEnd(range.endContainer, range.endOffset);
  
  const content = preRange.toString();
  const lines = content.split(/\n/).length;
  
  
  const height = editor.scrollHeight;
  const lineHeight = parseInt(window.getComputedStyle(editor).lineHeight);
  const estimatedPages = Math.ceil(height / (lineHeight * 40)) || 1;
  
  document.getElementById("cursorPosition").textContent = `Page ${estimatedPages}`;
}


docTitle.addEventListener("blur", () => {
  const fileName = docTitle.innerText.trim() || "Untitled Document";
  document.getElementById("fileName").textContent = fileName;
});


document.addEventListener("DOMContentLoaded", () => {
  
  const shortcuts = {
    "Save": "Ctrl+S",
    "Open": "Ctrl+O",
    "New": "Ctrl+N",
    "Print": "Ctrl+P"
  };
});


setInterval(() => {
  const saveStatus = document.getElementById("saveStatus");
  if (hasChanges) {
    saveStatus.style.opacity = "0.7";
    setTimeout(() => {
      saveStatus.style.opacity = "1";
    }, 500);
  }
}, 3000);


docTitle.addEventListener("dblclick", () => {
  docTitle.style.backgroundColor = "#e0e7ff";
  docTitle.focus();
  docTitle.select();
});


editor.addEventListener("paste", (e) => {
  e.preventDefault();
  
  
  const text = e.clipboardData.getData("text/plain");
  
  
  document.execCommand("insertText", false, text);
});


editor.addEventListener("input", () => {
  
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const text = range.commonAncestorContainer.textContent;
  
  
  if (text.includes('""')) {
    document.execCommand("insertText", false, text.replace(/"/g, '"'));
  }
});


document.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
  editor.style.backgroundColor = "rgba(37, 99, 235, 0.1)";
});

document.addEventListener("dragleave", () => {
  editor.style.backgroundColor = "";
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor.innerHTML += "<p>" + event.target.result.replace(/\n/g, "<br>") + "</p>";
        updateStats();
        markAsChanged();
      };
      reader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor.innerHTML += `<img src="${event.target.result}" style="max-width: 100%; height: auto;">`;
        updateStats();
        markAsChanged();
      };
      reader.readAsDataURL(file);
    }
  }
  
  editor.style.backgroundColor = "";
});


editor.addEventListener("tripleclick", () => {
  document.execCommand("selectAll", false, null);
});


document.addEventListener("keypress", (e) => {
  if (e.key === "-" && editor.contains(document.activeElement)) {
    const currentText = editor.innerText;
    if (currentText.trim().endsWith("-")) {
      e.preventDefault();
      document.execCommand("insertUnorderedList", false, null);
    }
  }
});


window.addEventListener("beforeunload", (e) => {
  if (hasChanges) {
    e.preventDefault();
    e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
    return "You have unsaved changes. Are you sure you want to leave?";
  }
});


if (window.innerWidth < 768) {
  
  document.querySelectorAll(".sidebar").forEach(s => s.style.display = "none");
}


window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    document.querySelectorAll(".toolbar-section").forEach(s => {
      s.style.display = "flex";
    });
  }
});


let zoomLevel = 100;
const zoomDisplay = document.getElementById("zoomLevel");


window.addEventListener("wheel", (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomLevel += 10;
    } else {
      zoomLevel -= 10;
    }
    zoomLevel = Math.min(200, Math.max(50, zoomLevel));
    zoomDisplay.textContent = zoomLevel + "%";
    document.body.style.zoom = (zoomLevel / 100);
  }
});


let isFocusMode = false;

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "f") {
    e.preventDefault();
    isFocusMode = !isFocusMode;
    
    document.querySelectorAll(".sidebar").forEach(s => {
      s.style.display = isFocusMode ? "none" : "flex";
    });
    
    editor.style.opacity = isFocusMode ? "1" : "1";
    alert(isFocusMode ? "Focus mode ON" : "Focus mode OFF");
  }
});


function loadUserPreferences() {
  const prefs = JSON.parse(localStorage.getItem("preferences")) || {};
  
  if (prefs.fontSize) {
    document.getElementById("fontSize").value = prefs.fontSize;
  }
  
  if (prefs.fontFamily) {
    document.getElementById("fontFamily").value = prefs.fontFamily;
  }
  
  if (prefs.lineSpacing) {
    document.getElementById("lineSpacing").value = prefs.lineSpacing;
    editor.style.lineHeight = prefs.lineSpacing;
  }
}

function saveUserPreferences() {
  const prefs = {
    fontSize: document.getElementById("fontSize").value,
    fontFamily: document.getElementById("fontFamily").value,
    lineSpacing: document.getElementById("lineSpacing").value
  };
  
  localStorage.setItem("preferences", JSON.stringify(prefs));
}


document.getElementById("fontSize").addEventListener("change", saveUserPreferences);
document.getElementById("fontFamily").addEventListener("change", saveUserPreferences);
document.getElementById("lineSpacing").addEventListener("change", saveUserPreferences);


loadUserPreferences();


console.log("%c WordPro Editor v1.0", "color: #2563eb; font-size: 16px; font-weight: bold;");
console.log("A professional word processor built with HTML, CSS, and JavaScript");