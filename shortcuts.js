document.addEventListener("keydown", (e) => {
  
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    openSaveDialog();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "o") {
    e.preventDefault();
    openLoadDialog();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "n") {
    e.preventDefault();
    if (hasChanges && !confirm("You have unsaved changes. Create new?")) return;
    editor.innerHTML = "<p>Start typing...</p>";
    docTitle.innerText = "Untitled Document";
    document.title = "Untitled Document - WordPro";
    updateStats();
    hasChanges = false;
  }
  
  
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
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "b") {
    e.preventDefault();
    document.execCommand("bold", false, null);
    editor.focus();
    updateButtonStates();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "i") {
    e.preventDefault();
    document.execCommand("italic", false, null);
    editor.focus();
    updateButtonStates();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "u") {
    e.preventDefault();
    document.execCommand("underline", false, null);
    editor.focus();
    updateButtonStates();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
    e.preventDefault();
    document.execCommand("undo", false, null);
    editor.focus();
  }
  
  
  if (((e.ctrlKey || e.metaKey) && e.key === "y") || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z")) {
    e.preventDefault();
    document.execCommand("redo", false, null);
    editor.focus();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "l") {
    e.preventDefault();
    document.execCommand("justifyLeft", false, null);
    editor.focus();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "e") {
    e.preventDefault();
    document.execCommand("justifyCenter", false, null);
    editor.focus();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "r") {
    e.preventDefault();
    document.execCommand("justifyRight", false, null);
    editor.focus();
  }
  
  
  if ((e.ctrlKey || e.metaKey) && e.key === "j") {
    e.preventDefault();
    document.execCommand("justifyFull", false, null);
    editor.focus();
  }
});


document.addEventListener("keydown", (e) => {
  
  if (e.key === "Tab" && editor.contains(document.activeElement)) {
    e.preventDefault();
    document.execCommand("indent", false, null);
  }
  
  
  if (e.shiftKey && e.key === "Tab" && editor.contains(document.activeElement)) {
    e.preventDefault();
    document.execCommand("outdent", false, null);
  }
});