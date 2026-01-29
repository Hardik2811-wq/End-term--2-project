// ===== SHORTCUTS.JS =====

document.addEventListener("keydown", (e) => {
  // Ctrl+S / Cmd+S - Save
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    openSaveDialog();
  }
  
  // Ctrl+O / Cmd+O - Open
  if ((e.ctrlKey || e.metaKey) && e.key === "o") {
    e.preventDefault();
    openLoadDialog();
  }
  
  // Ctrl+N / Cmd+N - New
  if ((e.ctrlKey || e.metaKey) && e.key === "n") {
    e.preventDefault();
    if (hasChanges && !confirm("You have unsaved changes. Create new?")) return;
    editor.innerHTML = "<p>Start typing...</p>";
    docTitle.innerText = "Untitled Document";
    document.title = "Untitled Document - WordPro";
    updateStats();
    hasChanges = false;
  }
  
  // Ctrl+P / Cmd+P - Print
  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    e.preventDefault();
    const printWindow = window.open("", "", "width=800,height=600");
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${docTitle.innerText}</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; padding: 60px; }
          h1, h2, h3 { margin: 12px 0; }
        </style>
      </head>
      <body>
        ${editor.innerHTML}
      </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }
  
  // Ctrl+B - Bold (already handled by execCommand)
  if ((e.ctrlKey || e.metaKey) && e.key === "b") {
    e.preventDefault();
    document.execCommand("bold", false, null);
    editor.focus();
    updateButtonStates();
  }
  
  // Ctrl+I - Italic
  if ((e.ctrlKey || e.metaKey) && e.key === "i") {
    e.preventDefault();
    document.execCommand("italic", false, null);
    editor.focus();
    updateButtonStates();
  }
  
  // Ctrl+U - Underline
  if ((e.ctrlKey || e.metaKey) && e.key === "u") {
    e.preventDefault();
    document.execCommand("underline", false, null);
    editor.focus();
    updateButtonStates();
  }
  
  // Ctrl+Z - Undo
  if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
    e.preventDefault();
    document.execCommand("undo", false, null);
    editor.focus();
  }
  
  // Ctrl+Y or Ctrl+Shift+Z - Redo
  if (((e.ctrlKey || e.metaKey) && e.key === "y") || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z")) {
    e.preventDefault();
    document.execCommand("redo", false, null);
    editor.focus();
  }
  
  // Ctrl+L - Align Left
  if ((e.ctrlKey || e.metaKey) && e.key === "l") {
    e.preventDefault();
    document.execCommand("justifyLeft", false, null);
    editor.focus();
  }
  
  // Ctrl+E - Align Center
  if ((e.ctrlKey || e.metaKey) && e.key === "e") {
    e.preventDefault();
    document.execCommand("justifyCenter", false, null);
    editor.focus();
  }
  
  // Ctrl+R - Align Right
  if ((e.ctrlKey || e.metaKey) && e.key === "r") {
    e.preventDefault();
    document.execCommand("justifyRight", false, null);
    editor.focus();
  }
  
  // Ctrl+J - Justify
  if ((e.ctrlKey || e.metaKey) && e.key === "j") {
    e.preventDefault();
    document.execCommand("justifyFull", false, null);
    editor.focus();
  }
});

// Prevent default browser shortcuts where needed
document.addEventListener("keydown", (e) => {
  // Allow Tab for indentation in editor
  if (e.key === "Tab" && editor.contains(document.activeElement)) {
    e.preventDefault();
    document.execCommand("indent", false, null);
  }
  
  // Shift+Tab for outdent
  if (e.shiftKey && e.key === "Tab" && editor.contains(document.activeElement)) {
    e.preventDefault();
    document.execCommand("outdent", false, null);
  }
});