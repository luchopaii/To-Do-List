    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function displayTasks() {
      const taskList = document.getElementById("task-list");
      taskList.innerHTML = "";
    }