// State to hold tasks
let tasks = [];
let editingTaskIndex = -1;

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const dueDateInput = document.getElementById('dueDate');
const priorityInput = document.getElementById('priority');
const taskListElement = document.getElementById('taskList');
const priorityFilter = document.getElementById('priorityFilter');

// Event Listeners
taskForm.addEventListener('submit', handleSubmit);
priorityFilter.addEventListener('change', handleFilterChange);

// Handle Task Submission (Add/Edit Task)
function handleSubmit(e) {
    e.preventDefault();

    const taskName = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (!taskName || !dueDate || !priority) {
        alert('Please fill in all fields');
        return;
    }

    if (editingTaskIndex === -1) {
        // Add new task
        const newTask = { taskName, dueDate, priority };
        tasks.push(newTask);
    } else {
        // Edit existing task
        tasks[editingTaskIndex] = { taskName, dueDate, priority };
        editingTaskIndex = -1;
    }

    resetForm();
    renderTasks();
}

// Handle Task Filter
function handleFilterChange() {
    renderTasks();
}

// Render Tasks
function renderTasks() {
    const filterValue = priorityFilter.value;

    // Filter tasks based on selected priority
    const filteredTasks = tasks.filter(task => {
        if (filterValue === 'all') return true;
        return task.priority === filterValue;
    });

    taskListElement.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <div>
                <span class="task-name">${task.taskName}</span>
                <span class="task-due-date">${task.dueDate}</span>
                <span class="task-priority">${task.priority}</span>
            </div>
            <div class="task-buttons">
                <button class="edit-button" onclick="editTask(${index})">Edit</button>
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskListElement.appendChild(taskItem);
    });
}

// Edit Task
function editTask(index) {
    const task = tasks[index];
    taskNameInput.value = task.taskName;
    dueDateInput.value = task.dueDate;
    priorityInput.value = task.priority;

    editingTaskIndex = index;
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Reset Form
function resetForm() {
    taskNameInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'low';
}
