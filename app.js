const items = document.querySelector(".items");
const addBtn = document.querySelector(".add__button");
const input = document.querySelector(".add__input");
const allDelete = document.querySelector(".footer-all__delete");

function onAdd() {
  const text = input.value;
  if (text == "") {
    input.value = "";
    input.focus();
    input.placeholder = "내용이 비어 있습니다.";
  } else {
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({ block: "center" });
    input.value = "";
    input.focus();
    input.placeholder = "";
  }
}

let id = 0;
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
        <div class="item">
          <span class="item__name">${text}</span>
          <button>
            <i class="fas fa-trash-alt item__delete" data-id=${id}></i>
          </button>
        </div>
        <div class="item__divider"></div>
  `;
  id++;
  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onAdd();
  }
});

items.addEventListener("click", function (event) {
  const id = event.target.dataset.id;

  if (id && event.target.matches(".item__delete")) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});

function allDeleteItem() {
  while (items.firstChild) {
    items.removeChild(items.lastChild);
  }
  items.classList.add("center");
  items.innerHTML = `<span class="clear">CLEAR</span>`;
  setTimeout(function () {
    items.innerHTML = "";
    items.classList.remove("center");
  }, 1500);
}
allDelete.addEventListener("click", () => {
  allDeleteItem();
});
