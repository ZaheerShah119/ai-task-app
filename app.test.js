const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("./app");

test("Create task", () => {
    const result = createTask({
        title: "Test",
        status: "Pending",
        priority: "High"
    });
    expect(result.title).toBe("Test");
});

test("Invalid task", () => {
    const result = createTask({});
    expect(result.error).toBe("Invalid task data");
});

test("Get tasks", () => {
    expect(Array.isArray(getTasks())).toBe(true);
});

test("Update task", () => {
    const result = updateTask(1, { status: "Done" });
    expect(result.status).toBe("Done");
});

test("Delete task", () => {
    const result = deleteTask(1);
    expect(result.id).toBeDefined();
});