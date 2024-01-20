const notesContainerID = "container";
const localStorageID = "notes";
const fetchedID = "fetch-time";

function updateNotes() {
  const notes = JSON.parse(localStorage.getItem(localStorageID)) || [];
  const notesElement = document.getElementById(notesContainerID);
  notesElement.innerHTML = "";
  for (const note of notes) {
    notesElement.appendChild(createElement(note));
  }
}

function createElement(note) {
  const textbox = document.createElement("textarea");
  textbox.value = note.text;
  textbox.readOnly = true;
  return textbox;
}

function updateSaveTime() {
  const lastSaveTime = document.getElementById(fetchedID);
  lastSaveTime.innerText = lastReceived + new Date().toLocaleTimeString();
}

function update() {
  updateNotes();
  updateSaveTime();
}

if (typeof Storage !== "undefined") {
  update();
  setInterval(update, 2000);
} else {
  const container = document.getElementById(notesContainerID);
  container.innerText = invalidBrowser;
}
