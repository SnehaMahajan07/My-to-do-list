// Get DOM elements
const taskInput = document.getElementById('taskInput');
const taskDeadline = document.getElementById('taskDeadline');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterPriority = document.getElementById('filterPriority');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Add Task Event
addTaskBtn.addEventListener('click', addTask);
filterPriority.addEventListener('change', filterTasks);

// Theme Toggle Event
themeToggleBtn.addEventListener('click', toggleTheme);

// Task Array to store tasks
let tasks = [];

// Add Task Function
function addTask() {
    const taskValue = taskInput.value.trim();
    const deadline = taskDeadline.value;
    const priority = taskPriority.value;

    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        text: taskValue,
        deadline: deadline,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    displayTasks();
    taskInput.value = ''; // Clear input field
}

// Display Tasks Function
function displayTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        // Create the list item
        const listItem = document.createElement('li');
        listItem.classList.add(task.priority);

        // Task Text and Deadline
        listItem.innerHTML = `
            <span>${task.text} (Due: ${task.deadline || 'No deadline'})</span>
            <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(listItem);
    });
}

// Complete Task Function
function completeTask(index) {
    tasks[index].completed = true;
    alert(`Task "${tasks[index].text}" is marked as completed!`);
    tasks.splice(index, 1);
    displayTasks();
}

// Delete Task Function
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Filter Tasks Function
function filterTasks() {
    const filter = filterPriority.value;
    const filteredTasks = tasks.filter(task => filter === 'all' || task.priority === filter);
    
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add(task.priority);

        listItem.innerHTML = `
            <span>${task.text} (Due: ${task.deadline || 'No deadline'})</span>
            <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(listItem);
    });
}

// Toggle Theme Function
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = "Switch to Light Theme";
    } else {
        themeToggleBtn.textContent = "Switch to Dark Theme";
    }
}
