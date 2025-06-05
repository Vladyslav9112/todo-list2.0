const titleElement = document.getElementById("title");
const btnCreate = document.getElementById("create");
const listElement = document.getElementById("list");

function render() {
  const notes = [];
  for (let note of notes) {
    listElement.insertAdjacentHTML("beforeend", createListElement(note));
  }
}
render();
function createListElement(value) {
  return `
    <li
          class="list-group-item d-flex justify-content-between align-items-center mb-2"
        >
          <span>${value}</span>
          <span>
            <span class="btn btn-small btn-success" id="btnSuccess">&check;</span>
            <span class="btn btn-small btn-danger" id="btnDanger">&times;</span>
          </span>
        </li>
        `;
}

btnCreate.onclick = function () {
  if (titleElement.value.length === 0) {
    return;
  }
  listElement.insertAdjacentHTML(
    "beforeend",
    createListElement(titleElement.value)
  );
  titleElement.value = "";
};

listElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-success")) {
    const listItem = event.target.closest("li");
    listItem.textContent = "Вітаю! Успішно виконане";
    listItem.style.backgroundColor = "green";
    listItem.style.transition = "background-color 0.5s ease";
    setTimeout(function () {
      listItem.remove();
    }, 3000);
  }
});

listElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-danger")) {
    const listItem = event.target.closest("li");
    listItem.textContent = "Окей, видаляємо";
    listItem.style.backgroundColor = "red";
    listItem.style.transition = "background-color 0.5s ease";
    setTimeout(function () {
      listItem.remove();
    }, 1000);
  }
});
