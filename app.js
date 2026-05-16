const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let id = 1;

function createTask(data) {
    if (!data.title || !data.status || !data.priority) {
        return { error: "Invalid task data" };
    }

    const task = {
        id: id++,
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

function updateTask(taskId, data) {
    const task = tasks.find(t => t.id == taskId);
    if (!task) return { error: "Task not found" };

    task.title = data.title || task.title;
    task.status = data.status || task.status;
    task.priority = data.priority || task.priority;

    return task;
}

function deleteTask(taskId) {
    const index = tasks.findIndex(t => t.id == taskId);
    if (index === -1) return { error: "Task not found" };

    return tasks.splice(index, 1)[0];
}

app.get("/", (req, res) => {
    res.send("Smart Task API Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};