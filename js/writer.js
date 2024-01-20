const notesContainerID = "container";
const localStorageID = "notes";
const savedID = "saved-time";
class Note {
  constructor(text = "") {
    this.text = text;
  }

  createElement() {
    const textbox = document.createElement("textarea");
    textbox.value = this.text;
    textbox.addEventListener("input", () => {
      this.text = textbox.value;
    });
    const removeButton = document.createElement("button");
    removeButton.innerText = removeText;
    removeButton.addEventListener("click", () => {
      this.remove();
    });

    const element = document.createElement("div");
    element.appendChild(textbox);
    element.appendChild(removeButton);
    return element;
  }

  remove() {
    const index = notes.indexOf(this);
    notes.splice(index, 1);
    updateNotesContainer();
  }
}

function updateNotesContainer() {
  const notesElement = document.getElementById(notesContainerID);
  notesElement.innerHTML = "";
  for (const note of notes) {
    notesElement.appendChild(note.createElement());
  }
}

// called in the html file
function addNote() {
  const note = new Note();
  notes.push(note);
  updateNotesContainer();
}

function saveToLocalStorage() {
  localStorage.setItem(localStorageID, JSON.stringify(notes));
  updateSaveTime();
}

function updateSaveTime() {
  const lastSaveTime = document.getElementById(savedID);
  lastSaveTime.innerText = savedAt + new Date().toLocaleTimeString();
}

function update() {
  saveToLocalStorage();
  updateSaveTime();
}

const notes = (JSON.parse(localStorage.getItem(localStorageID)) || []).map(
  (note) => new Note(note.text)
);

if (typeof Storage !== "undefined") {
  updateNotesContainer();
  updateSaveTime();
  setInterval(update, 2000);
} else {
  const container = document.getElementById(notesContainerID);
  container.innerText = invalidBrowser;
}
