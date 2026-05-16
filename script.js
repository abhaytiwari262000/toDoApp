let closeLogoPath = "/close.png";

let tasks_stringified = localStorage.getItem("tasks");

let tasks = JSON.parse(tasks_stringified);

let inputElement = document.getElementById("myInput");

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

    item.setAttribute("id", task.id);


    let closeButtonLogo = document.createElement("img")

    closeButtonLogo.setAttribute("alt", "close button");

    closeButtonLogo.setAttribute("src", closeLogoPath);

    item.appendChild(closeButtonLogo);

    list.appendChild(item);
  }
}

onPageLoad();

function addEnterEventListener(){
  
  inputElement.addEventListener("keydown",function (e){

    if (e.code == "Enter"){
      newElement()
    }
  });
}

addEnterEventListener()

list.addEventListener(
  "click",
  function (ev) {
    let target = ev.target;

    if (target.nodeName == "LI") {
      let targetId = target.id;

      target.classList.toggle("checked");

      for (let i = 0; i < tasks.length; i++) {
        task = tasks[i];

        if (task.id == targetId) {
          task.checked = !task.checked;
        }
      }

      let stringified_tasks = JSON.stringify(tasks);

      localStorage.setItem("tasks", stringified_tasks);
    }

    if (target.nodeName == "IMG") {
      let parentElement = target.parentElement;

      parentElement.classList.add("closed");

      console.log(tasks);

      for (let task in tasks){
        console.log(task)
      }

      tasks = tasks.filter((task) => {
        return task.id != parentElement.id;
      });

      console.log(tasks)

      let stringified_tasks = JSON.stringify(tasks);

      localStorage.setItem("tasks", stringified_tasks);
    }
  },
  false,
);

function newElement() {
  let li = document.createElement("li");

  let inputValue = inputElement.value;

  let t = document.createTextNode(inputValue);
  li.append(t);

  let idNumber = Math.floor(Math.random() * 1000);

  let id = "task" + idNumber;

  li.setAttribute("id", id);

  let closeButtonLogo = document.createElement("img");

  closeButtonLogo.setAttribute("alt", "close button");

  closeButtonLogo.setAttribute("src", closeLogoPath);

  li.appendChild(closeButtonLogo);

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
