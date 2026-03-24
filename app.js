const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const progressBar = document.getElementById('progress');
const progressCount = document.getElementById('numerbs');

let tasks = [];

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function loadTasks() {
    const savedTasks = localStorage.getItem('todo-tasks');
    
    if (savedTasks) {
        try {
            tasks = JSON.parse(savedTasks);
        } catch (error) {
            console.error('Error al cargar tareas:', error);
            tasks = [];
        }
    } else {
        // Tareas de ejemplo
        tasks = [
            { id: generateId(), text: 'Aprender HTML y CSS', completed: false },
            { id: generateId(), text: 'Dominar JavaScript', completed: true },
            { id: generateId(), text: 'Conectar con MongoDB y React', completed: false }
        ];
        saveTasks();
    }
    
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    
    if (!text) return;
    
    const newTask = {
        id: generateId(),
        text: text,
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    const tasksHTML = tasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask('${task.id}')">
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="delete-btn" type="button" onclick="deleteTask('${task.id}')">
                <i class='bx bx-trash'></i>
            </button>
        </li>
    `).join('');
    
    taskList.innerHTML = tasksHTML;
    
    updateProgress();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    progressBar.style.width = `${percentage}%`;
    progressCount.textContent = `${completed} / ${total}`;
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

loadTasks();
