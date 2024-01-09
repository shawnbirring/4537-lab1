function updateNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const notesElement = document.getElementById("container");
  notesElement.innerHTML = "";
  for (const note of notes) {
    notesElement.appendChild(createElement(note));
  }
}

function updateSaveTime() {
  const lastSaveTime = document.getElementById("fetch-time");
  lastSaveTime.innerText =
    "Last retrieved at: " + new Date().toLocaleTimeString();
}

function update() {
  updateNotes();
  updateSaveTime();
}

function createElement(note) {
  const textbox = document.createElement("textarea");
  textbox.value = note.text;
  textbox.readOnly = true;
  return textbox;
}
update();
setInterval(update, 2000);
