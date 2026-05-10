let tasks_stringified = localStorage.getItem("tasks");

let tasks = JSON.parse(tasks_stringified);

if (tasks == null) {
  tasks = [];
}

let list = document.getElementById("myUL");

function onPageLoad() {
  for (let i = 0; i < tasks.length; i++) {
    task = tasks[i];

    let item = document.createElement("li");

    if (task.checked) {
      item.classList.add("checked");
    }

    let text = document.createTextNode(task.value);

    item.append(text);

    list.appendChild(item);
  }
}

onPageLoad();

list.addEventListener(
  "click",
  function (ev) {
    ev.target.classList.toggle("checked");

    let target = ev.target;

    let targetText = target.textContent;

    for (let i = 0; i < tasks.length; i++) {
      task = tasks[i];

      if (task.value == targetText) {
        task.checked = !task.checked;
      }
    }

    let stringified_tasks = JSON.stringify(tasks);

    localStorage.setItem("tasks", stringified_tasks);
  },
  false,
);

function newElement() {
  let li = document.createElement("li");

  let inputValue = document.getElementById("myInput").value;

  let t = document.createTextNode(inputValue);
  li.append(t);

  let idNumber = Math.floor(Math.random() * 1000);

  let id = "task" + idNumber;


  li.setAttribute("id",id);

  let closeButton = document.createElement("span");

  let closeText = document.createTextNode("close");

  closeButton.append(closeText);

  li.appendChild(closeButton);


  if (inputValue == "") {
    alert("Write something");
  } else {
    document.getElementById("myUL").appendChild(li);

    let task = {
      id: id,
      value: inputValue,
      checked: false,
    };

    tasks.push(task);

    let stringified_tasks = JSON.stringify(tasks);

    localStorage.setItem("tasks", stringified_tasks);
  }

  document.getElementById("myInput").value = "";
}
