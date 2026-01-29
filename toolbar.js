document.querySelectorAll("[data-cmd]").forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const command = button.getAttribute("data-cmd");
    
    
    if (command === "createLink") {
      const url = prompt("Enter URL:");
      if (url) document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, null);
    }
    
    editor.focus();
    updateButtonStates();
  });
});


document.getElementById("fontFamily").addEventListener("change", (e) => {
  document.execCommand("fontName", false, e.target.value);
  editor.focus();
});


document.getElementById("fontSize").addEventListener("change", (e) => {
  document.execCommand("fontSize", false, e.target.value);
  editor.focus();
});


document.getElementById("fontColor").addEventListener("change", (e) => {
  document.execCommand("foreColor", false, e.target.value);
  editor.focus();
});


document.getElementById("highlightColor").addEventListener("change", (e) => {
  document.execCommand("backColor", false, e.target.value);
  editor.focus();
});


document.getElementById("lineSpacing").addEventListener("change", (e) => {
  editor.style.lineHeight = e.target.value;
  editor.focus();
});


document.getElementById("caseUpper").addEventListener("click", () => {
  applyTextCase("upper");
});

document.getElementById("caseLower").addEventListener("click", () => {
  applyTextCase("lower");
});

document.getElementById("caseSentence").addEventListener("click", () => {
  applyTextCase("sentence");
});

function applyTextCase(type) {
  const selection = window.getSelection();
  if (selection.toString().length === 0) {
    alert("Please select text first");
    return;
  }
  
  let text = selection.toString();
  
  switch (type) {
    case "upper":
      text = text.toUpperCase();
      break;
    case "lower":
      text = text.toLowerCase();
      break;
    case "sentence":
      text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      break;
  }
  
  document.execCommand("insertText", false, text);
}


document.querySelectorAll(".style-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const style = btn.dataset.style;
    
    switch (style) {
      case "heading1":
        document.execCommand("formatBlock", false, "<h1>");
        break;
      case "heading2":
        document.execCommand("formatBlock", false, "<h2>");
        break;
      case "heading3":
        document.execCommand("formatBlock", false, "<h3>");
        break;
      case "normal":
        document.execCommand("formatBlock", false, "<p>");
        break;
    }
    
    editor.focus();
  });
});


document.getElementById("increaseIndent").addEventListener("click", () => {
  document.execCommand("indent", false, null);
  editor.focus();
});

document.getElementById("decreaseIndent").addEventListener("click", () => {
  document.execCommand("outdent", false, null);
  editor.focus();
});


function updateButtonStates() {
  const commands = ["bold", "italic", "underline"];
  
  commands.forEach(cmd => {
    const btn = document.querySelector(`[data-cmd="${cmd}"]`);
    if (document.queryCommandState(cmd)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}


editor.addEventListener("mouseup", updateButtonStates);
editor.addEventListener("keyup", updateButtonStates);
editor.addEventListener("click", updateButtonStates);


updateButtonStates();