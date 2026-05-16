const express = require('express');
const app = express();

app.use(express.json());

// Temporary local array to manage tasks
let tasks = [
    { id: 1, title: 'Setup GitHub Repository', status: 'completed', priority: 'high' },
    { id: 2, title: 'Configure CI/CD Pipeline', status: 'in-progress', priority: 'medium' }
];

// 1. GET ALL TASKS
app.get('/api/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// 2. CREATE NEW TASK (With Refactored AI Validation)
app.post('/api/tasks', (req, res) => {
    const { title, status, priority } = req.body;

    // Refactored validation check
    if (!title || !status || !priority) {
        return res.status(400).json({ 
            error: 'Validation Failed', 
            message: 'Missing required fields: title, status, and priority are all mandatory.' 
        });
    }

    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        status,
        priority
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 3. UPDATE TASK BY ID
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, status, priority } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (title) tasks[taskIndex].title = title;
    if (status) tasks[taskIndex].status = status;
    if (priority) tasks[taskIndex].priority = priority;

    res.status(200).json(tasks[taskIndex]);
});

// 4. DELETE TASK BY ID
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask[0] });
});

// Root route for cloud deployment testing
app.get('/', (req, res) => {
    res.status(200).send("Smart Task Management API Running Successfully!");
});

// Server listen configuration for local and cloud platforms
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Smart Task Management API running on port ${PORT}`);
    });
}

module.exports = app;