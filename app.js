const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let currentId = 1;

function createTask(data) {
    if (!data.title || !data.status || !data.priority) {
        return { error: "Invalid task data" };
    }

    const task = {
        id: currentId++,
        title: data.title,
        status: data.status,
        priority: data.priority
    };

    tasks.push(task);
    return task;
}

function getTasks() {
    return tasks;
}

function updateTask(id, data) {
    const task = tasks.find(t => t.id == id);

    if (!task) {
        return { error: "Task not found" };
    }

    task.title = data.title || task.title;
    task.status = data.status || task.status;
    task.priority = data.priority || task.priority;

    return task;
}

function deleteTask(id) {
    const index = tasks.findIndex(t => t.id == id);

    if (index === -1) {
        return { error: "Task not found" };
    }

    return tasks.splice(index, 1)[0];
}

app.get("/", (req, res) => {
    res.send("Smart Task Management API Running");
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};