const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishedList = document.querySelector(".js-Finished");

const TODOS_LS = 'ToDos';
const FINISHED_LS = "Finished";

let toDos = [];
let finished = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    if (li.parentNode.className === "js-toDoList toDoList") {
        toDoList.removeChild(li);
        const cleanTasks = toDos.filter(function(task) {
            return task.id !== parseInt(li.id);
        });
        toDos = cleanTasks;
    } else {
        finishedList.removeChild(li);
        const cleanTasks = finished.filter(function (task) {
            return task.id !== parseInt(li.id);
        });
        finished = cleanTasks;
    }
    saveToDos();
}

function switchTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    if (li.parentNode.className === "js-toDoList toDoList") {
      toDoList.removeChild(li);
      finishedList.appendChild(li);
      btn.innerHTML = "🔙";
      const tasks = toDos.filter(function (t) {
        return t.id === parseInt(li.id);
      });
      const cleanTasks = toDos.filter(function (t) {
        return t.id !== parseInt(li.id);
      });
      finished.push(tasks[0]);
      toDos = cleanTasks;
    } else {
      finishedList.removeChild(li);
      toDoList.appendChild(li);
      btn.innerHTML = "✅";
      const tasks = finished.filter(function (t) {
        return t.id === parseInt(li.id);
      });
      const cleanTasks = finished.filter(function (t) {
        return t.id !== parseInt(li.id);
      });
      toDos.push(tasks[0]);
      finished = cleanTasks;
    }
    saveToDos();
  }

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function paintToDoTask(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const newId = toDos.length + 1;
    span.innerText = text;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    checkBtn.innerHTML = "✅";
    checkBtn.addEventListener("click", switchTask);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const taskObj = {
      id: newId,
      text: text
    };
    toDos.push(taskObj);
    saveToDos();
  }
  
  function paintFinishedTask(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const newId = finished.length + 1;
    span.innerText = text;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    checkBtn.innerHTML = "🔙";
    checkBtn.addEventListener("click", switchTask);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    finishedList.appendChild(li);
    const taskObj = {
      id: newId,
      text: text
    };
    finished.push(taskObj);
    saveToDos();
  }

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDoTask(currentValue);
    toDoInput.value = "";
}


function loadToDos() {
    const PendingTasks = localStorage.getItem(TODOS_LS);
    const FinishedTasks = localStorage.getItem(FINISHED_LS);
    if (PendingTasks !== null && FinishedTasks !== null) {
      const parsedPendingTasks = JSON.parse(PendingTasks);
      const parsedFinishedTasks = JSON.parse(FinishedTasks);
      parsedPendingTasks.forEach(function (task) {
        paintToDoTask(task.text);
      });
      parsedFinishedTasks.forEach(function (task) {
        paintFinishedTask(task.text);
      });
    }
}
function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();