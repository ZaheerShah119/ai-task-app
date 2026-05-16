const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("./app");

test("Create task successfully", () => {
    const result = createTask({
        title: "Test Task",
        status: "Pending",
        priority: "High"
    });

    expect(result.title).toBe("Test Task");
});

test("Fail creating invalid task", () => {
    const result = createTask({});

    expect(result.error).toBe("Invalid task data");
});

test("Get all tasks", () => {
    const tasks = getTasks();

    expect(Array.isArray(tasks)).toBe(true);
});

test("Update task", () => {
    const updated = updateTask(1, {
        status: "Completed"
    });

    expect(updated.status).toBe("Completed");
});

test("Delete task", () => {
    const deleted = deleteTask(1);

    expect(deleted.id).toBe(1);
});