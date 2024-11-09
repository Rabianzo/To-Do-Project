const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

window.onload = loadTasks;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(listItem => ({
        text: listItem.querySelector('.task-text').innerText,
        completed: listItem.querySelector('.task-text').classList.contains('done')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTasks();
        newTaskInput.value = '';
        
        // GSAP Animation for the Add Button
        gsap.to('.add-btn', { duration: 0.2, scale: 1.15, backgroundColor: "#ff0000", yoyo: true, repeat: 1 });
    }
}

function addTaskToDOM(taskText, completed = false) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span class="task-text ${completed ? 'done' : ''}">${taskText}</span>
        <button class="done-btn ml-2" onclick="markAsDone(this)" aria-label="Mark as Done">Done</button>
        <button class="delete-btn ml-2" onclick="deleteTask(this)" aria-label="Delete Task">Delete</button>
    `;
    taskList.appendChild(listItem);
}

function markAsDone(button) {
    const listItem = button.parentElement.querySelector('.task-text');
    listItem.classList.toggle('done');
    gsap.to(button, { duration: 0.2, backgroundColor: "#333", yoyo: true, repeat: 1 });
    saveTasks();
}

function deleteTask(button) {
    const listItem = button.parentElement;
    gsap.to(button, { duration: 0.3, scale: 0.8, backgroundColor: "black", yoyo: true, repeat: 1, onComplete: () => {
        taskList.removeChild(listItem);
        saveTasks();
    }});
}

newTaskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

