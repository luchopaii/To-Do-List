// Obtener elementos del la pagina principal para poder trabajar con las weas lo que esta entre las comillas simples son los id del text area y inputtitle para asi mas adelante crear la tarea a lo vio vo sabi
const addTaskBtn = document.querySelector('.add-task');
const titleInput = document.querySelector('.input-title-task');
const descInput = document.querySelector('.description-textarea');
const taskList = document.querySelector('.task-list');
const progressBar = document.getElementById('progress');

// Obtener tareas existentes desde el localStorage
// Si no hay tareas guardadas previamente, inicializa la lista de tareas como un arreglo vacío
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Función para mostrar todas las tareas almacenadas esta funcion se va a repetir kleta
function displayTasks() {
    // Elimina las tareas previamente mostradas en la lista para evitar duplicados
    const items = document.querySelectorAll('.task-item');
    items.forEach(item => item.remove());

    //esta wea crea los elementos d la lista con una clase para ponerle css y tmbn se le puede poner una classe para que basicamente la wea funcione como un div 
    // Itera sobre todas las tareas y crea un nuevo elemento <li> para cada tarea
    tasks.forEach((task, index) => {
        // Crea un nuevo <li> para cada tarea
        const li = document.createElement('li');
        li.className = 'task-item'; // Asigna una clase 'task-item' al <li>
        li.style.position = 'relative'; // Ajusta la posición de cada tarea (en este caso relativa)

        // Crea un checkbox para marcar la tarea como completada o no completada aca lo que se crea es el input pero se le asigna el tipo checkbox para ocupar la caga
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; // Define el tipo de input como checkbox
        checkbox.checked = task.completed; // Si la tarea está completada, se marca el checkbox
        checkbox.className = 'task-checkbox'; // Asigna una clase para el checkbox para ponerle css aunq no puede cambiar el color como el del panxo porfavor intenta si es que puedes 
        checkbox.onchange = () => toggleComplete(index); // Llama a la función para cambiar el estado de la tarea al hacer clic

        // Crea el título de la tarea (con el índice para numerarlas) esta wea acuerdate que la crea dentro de "li" que eta mas arriba que te dije que funcionaba como un div la wea
        const title = document.createElement('strong');
        title.className = 'task-title'; // Asigna una clase para el título para css
        title.textContent = `${index + 1}. ${task.title}`; // Muestra el índice + título de la tarea
        if (task.completed) title.classList.add('completed'); // Si la tarea está completada, agrega la clase 'completed' al título esta clase es muy importante basicamente cuando la tarea se completa marcando el checkbox esta clase se crea en todo los elementos donde salga este codigo y asi jugar con el css

        // Crea el párrafo que contiene la descripción de la tarea nuevamente dentro de el "li" que dije q funcionaba como div
        const desc = document.createElement('p');
        desc.textContent = task.description; // Asigna la descripción de la tarea
        task.className = 'task-description'; // Asigna una clase para la descripción para css
        if (task.completed) desc.classList.add('completed'); // t lo explique mas arriba

        // Crea el botón de eliminar la tarea pa eliminarla xd... nah basicamnete cuando se presiona el boton se ocupa la funcion delete que elimina la tarea en base al indice q tenga
        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete'; // Asigna una clase para el botón de eliminar
        delBtn.textContent = 'X'; // Establece el texto 'X' en el botón
        delBtn.onclick = () => deleteTask(index); // Llama a la función de eliminar tarea al hacer clic

        // Añade los elementos (checkbox, título, descripción y botón de eliminar) al <li>
        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(document.createElement('br')); // Añade un salto de línea entre el título y la descripción
        li.appendChild(desc);
        li.appendChild(delBtn); // Añade el botón de eliminar

        // Añade el <li> (tarea completa) al contenedor de la lista de tareas
        taskList.appendChild(li);
    });
}

// Añadir nueva tarea cuando el botón de "Add Task" es presionado
addTaskBtn.addEventListener('click', () => {
    // Obtiene los valores del título y la descripción de los inputs
    const title = titleInput.value.trim(); // Elimina los espacios extra alrededor del título
    const description = descInput.value.trim(); // Elimina los espacios extra alrededor de la descripción

    // Si el título o la descripción están vacíos, muestra una alerta y no agrega la tarea
    if (title === '' || description === '') {
        alert('Both title and description are required.'); // Muestra una alerta si faltan datos
        return;
    }

    // Crea un objeto para la nueva tarea con título, descripción y estado de completado
    const newTask = {
        title,
        description,
        completed: false // La nueva tarea comienza como incompleta
    };

    // Agrega la nueva tarea al array de tareas
    tasks.push(newTask);

    // Guarda las tareas en el localStorage para que persistan entre recargas de la página esta funcion tmbn es importante y se ocupa mucho
    saveTasks();

    // Limpia los campos de entrada para agregar una nueva tarea después
    titleInput.value = '';
    descInput.value = '';

    // Muestra todas las tareas después de agregar la nueva la tareas anteriores se siguen mostrando porque si no queda la caga
    displayTasks();
});

// Función para alternar entre tarea completada y no completada cuando la wea d checkbox se activa
function toggleComplete(index) {
    // Cambia el estado de completado de la tarea al hacer clic en el checkbox
    tasks[index].completed = !tasks[index].completed;

    // Guarda las tareas actualizadas en el localStorage
    saveTasks();

    // Vuelve a mostrar todas las tareas, actualizando el estado de completado
    displayTasks();
}

// Función para eliminar una tarea esta funcion entra en juego al apretar el btn delete
function deleteTask(index) {
    // Elimina la tarea seleccionada del array de tareas
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

// Función para guardar las tareas en el localStorage
function saveTasks() {
    // Convierte las tareas a formato JSON y las guarda en el localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Muestra las tareas almacenadas cuando se carga la página por primera vez
displayTasks();
