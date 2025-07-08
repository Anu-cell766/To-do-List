const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const isCompleted = task.completed ? 'completed-task' : '';
        const card = document.createElement('div');
        card.className = `task-card card ${task.priority} ${isCompleted}`;

        card.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title">${task.title}</h5>
                    <div>
                        <input type="checkbox" title="Mark as done" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
                    </div>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">Due: ${task.dueDate}</h6>
                <p class="card-text">${task.description}</p>
                <p class="card-text"><strong>Priority:</strong> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(card);
    });
}

function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('priority').value = task.priority;
    tasks.splice(index, 1);
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (title && description && dueDate && priority) {
        tasks.push({ title, description, dueDate, priority, completed: false }); // add completed flag
        saveTasks();
        renderTasks();
        taskForm.reset();
    }
});

renderTasks();