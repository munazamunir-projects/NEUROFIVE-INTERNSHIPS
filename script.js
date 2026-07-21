const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");
const remainingCount = document.querySelector("#remainingCount");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let currentFilter = "all";

// Add Task
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}

// Render Tasks
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");
        li.classList.add("task-item");

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.classList.add("complete-btn");

        completeBtn.addEventListener("click", function () {

            task.completed = !task.completed;

            renderTasks();

        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {

            tasks = tasks.filter(t => t.id !== task.id);

            renderTasks();

        });

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateCounter();

}

// Update Remaining Tasks

function updateCounter() {

    const remaining = tasks.filter(task => !task.completed).length;

    if (remaining === 1) {
        remainingCount.textContent = "1 Task Remaining";
    }
    else {
        remainingCount.textContent = remaining + " Tasks Remaining";
    }

}

// Filter Buttons

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});

// Initial Counter

updateCounter();