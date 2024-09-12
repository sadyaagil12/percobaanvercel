function addTask() {
  var taskInput = document.getElementById("task");
  var priorityInput = document.getElementById("priority");
  var dueDateInput = document.getElementById("dueDate");
  var taskText = taskInput.value.trim();
  var priority = priorityInput.value;
  var dueDate = dueDateInput.value;

  if (taskText !== "") {
    var taskList = document.getElementById("taskList");
    var newTask = document.createElement("li");
    newTask.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" onclick="completeTask(this)">
                <label class="form-check-label" style="margin-left: 10px;">
                    ${taskText} (Priority: ${priority}, Due: ${dueDate})
                </label>
            </div>
            <button onclick="removeTask(this)">Delete</button>
        `;

    taskList.appendChild(newTask);

    taskInput.value = "";
    priorityInput.value = "low";
    dueDateInput.value = "";

    // nyimpen updated list ke localStorage
    saveData();
  }
}

// Berfungsi untuk menandain tugas sebagai selesai
function completeTask(checkbox) {
  var taskItem = checkbox.parentElement.parentElement;
  var taskText = taskItem.querySelector(".form-check-label").innerText;

  //memberikan line-through
  checkbox.nextElementSibling.classList.toggle("completed");

  // untuk memindahkan tugas aktif ke tugas selesai apabila sudah dicentang
  if (checkbox.checked) {
    taskItem.remove();

    // buat nambahin inputan ke tugas selesai
    var completedTaskList = document.getElementById("completedTaskList");
    var completedTask = document.createElement("li");
    completedTask.innerHTML = `
            <div class="form-check">
                <label class="form-check-label completed" style="margin-left: 10px;">
                    ${taskText}
                </label>
            </div>
        `;
    completedTaskList.appendChild(completedTask);
  }

  saveData();
}

// fungsi untuk menghapus inputan
function removeTask(button) {
  var taskItem = button.parentElement;
  taskItem.remove();

  // menyimpan inputan ke localsotrage apabila sudah dihapus
  saveData();
}

// fungsi untuk menyimpan tugas aktif ke localStorage
function saveData() {
  var taskList = document.getElementById("taskList").children;
  var completedTaskList = document.getElementById("completedTaskList").children;

  let tasksArray = [];
  let tasksDoneArray = [];

  for (let task of taskList) {
    let taskText = task.querySelector(".form-check-label").innerText;
    tasksArray.push(taskText);
  }

  for (let completedTask of completedTaskList) {
    tasksDoneArray.push(completedTask.innerText);
  }

  // fungsi untuk menyimpan tugas selesai ke localStorage
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  localStorage.setItem("taskDone", JSON.stringify(tasksDoneArray));
}

// fungsi untuk memunculkan tugas dari localStogare
function loadTasks() {
  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  let tasksDoneArray = JSON.parse(localStorage.getItem("taskDone")) || [];

  // memunculkan setiap savean inputan tugas aktif ke list tugas aktif
  tasksArray.forEach((taskText) => {
    var taskList = document.getElementById("taskList");
    var newTask = document.createElement("li");
    newTask.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" onclick="completeTask(this)">
                <label class="form-check-label" style="margin-left: 10px;">
                    ${taskText}
                </label>
            </div>
            <button onclick="removeTask(this)">Delete</button>
        `;
    taskList.appendChild(newTask);
  });

  // memunculkan setiap savean inputan tugas selesai ke list tugas selesai
  tasksDoneArray.forEach((taskText) => {
    var completedTaskList = document.getElementById("completedTaskList");
    var completedTask = document.createElement("li");
    completedTask.innerHTML = `
            <div class="form-check">
                <label class="form-check-label completed" style="margin-left: 10px;">
                    ${taskText}
                </label>
            </div>
        `;
    completedTaskList.appendChild(completedTask);
  });
}
function clearAllTasks() {
  document.getElementById("completedTaskList").innerHTML = "";

  // ngapus tugas dari localStorage
  localStorage.removeItem("tasks");
  localStorage.removeItem("taskDone");

  alert("Tugas dihapus!");
}
