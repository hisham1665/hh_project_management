export const GenerateTasksByAi =  (name, description, numTasks) => {
    // write the code to generate tasks based on the provided name, description, and number of tasks
    const task = [
        {
            title: "${name} Task 1",
            description: `${description} - Task 1`,
            priority: "low"
        },
        {
            title: "${name} Task 2",
            description: `${description} - Task 2`,
            priority: "medium"
        },
        {
            title: "${name} Task 3",
            description: `${description} - Task 3`,
            priority: "high"
        }
    ];

    return task;
}