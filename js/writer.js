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
    removeButton.innerText = "Remove";
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
    updateNotes();
  }
}

let notes = JSON.parse(localStorage.getItem("notes")) || [];
notes = notes.map((note) => new Note(note.text));

function updateNotes() {
  const notesElement = document.getElementById("container");
  notesElement.innerHTML = "";
  for (const note of notes) {
    notesElement.appendChild(note.createElement());
  }
}

// called in the html file
function addNote() {
  const note = new Note();
  notes.push(note);
  updateNotes();
}

function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
  updateSaveTime();
}

function updateSaveTime() {
  const lastSaveTime = document.getElementById("saved-time");
  lastSaveTime.innerText = "Last saved at: " + new Date().toLocaleTimeString();
}

function update() {
  save();
  updateNotes();
  updateSaveTime();
}

update();
setInterval(update, 2000);
