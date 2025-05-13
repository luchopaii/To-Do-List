let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    const taskList = document.getElementById("task-list");
     taskList.innerHTML = "";

    tasks.forEach(taskList, index => {
        const li = document.createElement('li')
    });

    const checkbox = document.createElement('')
}