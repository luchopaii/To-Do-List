// Obtener elementos del DOM
const addTaskBtn = document.querySelector('.add-task');
const titleInput = document.querySelector('.input-title-task');
const descInput = document.querySelector('.description-textarea');
const taskList = document.querySelector('.task-list');
const progressBar = document.getElementById('progress');

// Obtener tareas y último ID del localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let lastTaskId = parseInt(localStorage.getItem('lastTaskId')) || 0;

function updateProgressBar() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const percent = total > 0 ? (completed / total) * 100 : 0;

    progressBar.style.width = `${percent}%`;
}

// Mostrar tareas
function displayTasks() {
    const items = document.querySelectorAll('.task-item');
    items.forEach(item => item.remove());

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.id = `${task.id}`; // Asignar ID único al elemento
        li.style.position = 'relative';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.className = 'task-checkbox';
        checkbox.onchange = () => toggleComplete(task.id);

        const title = document.createElement('strong');
        title.className = 'task-title';
        title.textContent = `${index + 1}. ${task.title}`;
        if (task.completed) title.classList.add('completed');

        const desc = document.createElement('p');
        desc.textContent = task.description;
        desc.className = 'task-description';
        if (task.completed) desc.classList.add('completed');

        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete';
        delBtn.textContent = '🗑️';
        delBtn.onclick = () => deleteTask(task.id);

        const modifyBtn = document.createElement('button');
        modifyBtn.textContent = '✏️';
        modifyBtn.className = 'btn-modify';

        modifyBtn.onclick = () => {
            const newTitleInput = document.createElement('input');
            newTitleInput.type = 'text';
            newTitleInput.value = task.title;
            newTitleInput.className = 'edit-title';

            const newDescInput = document.createElement('textarea');
            newDescInput.value = task.description;
            newDescInput.className = 'edit-desc';

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.className = 'btn-save';

            li.innerHTML = '';
            li.appendChild(checkbox);
            li.appendChild(newTitleInput);
            li.appendChild(document.createElement('br'));
            li.appendChild(newDescInput);
            li.appendChild(saveBtn);

            saveBtn.onclick = () => {
                const newTitle = newTitleInput.value.trim();
                const newDesc = newDescInput.value.trim();

                if (newTitle === '' || newDesc === '') {
                    alert('Both fields are required.');
                    return;
                }

                const taskToUpdate = tasks.find(t => t.id === task.id);
                taskToUpdate.title = newTitle;
                taskToUpdate.description = newDesc;
                saveTasks();
                displayTasks();
            };
        };

        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(document.createElement('br'));
        li.appendChild(desc);
        li.appendChild(delBtn);
        li.appendChild(modifyBtn);

        taskList.appendChild(li);

        updateProgressBar();
    });
}

// Agregar tarea
addTaskBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (title === '' || description === '') {
        alert('Both title and description are required.');
        return;
    }

    lastTaskId++;
    localStorage.setItem('lastTaskId', lastTaskId);

    const newTask = {
        id: lastTaskId,
        title,
        description,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();

    titleInput.value = '';
    descInput.value = '';

    displayTasks();
});

// Alternar completado
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        displayTasks();
    }
}

// Eliminar tarea
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    displayTasks();
    updateProgressBar();
}

// Guardar en localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas al iniciar
displayTasks();
