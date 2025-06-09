const titleElement = document.getElementById("title");
const btnCreate = document.getElementById("create");
const listElement = document.getElementById("list");

// Отримуємо нотатки з localStorage, або пустий масив
function getNotes() {
  const notesJSON = localStorage.getItem("notes");
  return notesJSON ? JSON.parse(notesJSON) : [];
}

// Зберігаємо нотатки в localStorage
function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Відмалювати список нотаток
function render() {
  const notes = getNotes();
  listElement.innerHTML = ""; // очищуємо перед відмалюванням

  for (let note of notes) {
    listElement.insertAdjacentHTML("beforeend", createListElement(note));
  }
}

// Створюємо HTML для нотатки
function createListElement(value) {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center mb-2 rounded">
      <span>${value}</span>
      <span>
        <span class="btn btn-small btn-success btn-success-note">&check;</span>
        <span class="btn btn-small btn-danger btn-danger-note">&times;</span>
      </span>
    </li>
  `;
}

// Додаємо нову нотатку
btnCreate.onclick = function () {
  if (titleElement.value.trim().length === 0) {
    return;
  }

  const notes = getNotes();
  notes.push(titleElement.value.trim());
  saveNotes(notes);

  render();

  titleElement.value = "";
};

// Обробка кліку для кнопки "Успішно" та "Видалити" через делегування
listElement.addEventListener("click", function (event) {
  const notes = getNotes();

  if (event.target.classList.contains("btn-success-note")) {
    const listItem = event.target.closest("li");
    const noteText = listItem.querySelector("span").textContent;

    // Замість listItem.textContent - зробимо анімацію, але щоб зберегти логіку просто видалимо нотатку
    listItem.textContent = "Вітаю! Успішно виконане";
    listItem.style.backgroundColor = "green";
    listItem.style.transition = "background-color 0.5s ease";

    // Видаляємо нотатку з localStorage через 3 секунди
    setTimeout(function () {
      const index = notes.indexOf(noteText);
      if (index !== -1) {
        notes.splice(index, 1);
        saveNotes(notes);
      }
      listItem.remove();
    }, 1000);
  }

  if (event.target.classList.contains("btn-danger-note")) {
    const listItem = event.target.closest("li");
    const noteText = listItem.querySelector("span").textContent;

    listItem.textContent = "Окей, видаляємо";
    listItem.style.backgroundColor = "red";
    listItem.style.transition = "background-color 0.5s ease";

    // Видаляємо нотатку з localStorage через 1 секунду
    setTimeout(function () {
      const index = notes.indexOf(noteText);
      if (index !== -1) {
        notes.splice(index, 1);
        saveNotes(notes);
      }
      listItem.remove();
    }, 1000);
  }
});

// Відмальовуємо нотатки при завантаженні сторінки
render();
