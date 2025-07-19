import Task from '../models/task.model.js';
import Project from '../models/project.model.js';
import User from '../models/user.model.js';

// ✅ Create a new task
export const createTask = async (req, res) => {
  const { title, description,  priority, status , dueDate, createdBy , projectId, assignedTo } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({ title, description, project: projectId, priority , status, dueDate, createdBy , assignedTo});

    // Push task to project's task list
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all tasks of a project
export const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name email');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update task (title, description, status)
export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, priority } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;

    await task.save();
    res.status(200).json({ message: 'Task updated', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Assign a task to a user
export const assignTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.assignedTo = userId;
    await task.save();

    res.status(200).json({ message: 'Task assigned', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a task
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Remove task from project.tasks list
    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Task and add to Project
export const addTaskToProject = async (req, res) => {
  const { projectId } = req.params;
  const tasks = req.body;

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return res.status(400).json({ error: "No tasks provided." });
  }

  try {
    const createdTasks = [];

    for (const task of tasks) {
      // Validate required fields
      if (!task.title || !task.createdBy) {
        continue; // skip invalid task
      }

      const newTask = await Task.create({
        title: task.title,
        description: task.description || "",
        priority: task.priority || "low",
        status: task.status || "todo",
        dueDate: task.dueDate,
        createdBy: task.createdBy,
        assignedTo: task.assignedTo || null,
        project: projectId,
      });

      // Push the task ID to the project's tasks array
      await Project.findByIdAndUpdate(projectId, {
        $push: { tasks: newTask._id },
      });

      createdTasks.push(newTask);
    }

    res.status(201).json({
      message: `${createdTasks.length} task(s) created successfully.`,
      tasks: createdTasks,
    });
  } catch (error) {
    console.error("Error creating tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get comments for a task
export const getTaskComments = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId).populate("comments.user", "name avatarIndex");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ comments: task.comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Post a comment to a task
export const postTaskComment = async (req, res) => {
  const { taskId } = req.params;
  const { userId, text } = req.body;
  if (!userId || !text) {
    return res.status(400).json({ error: "User and text are required." });
  }
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const comment = {
      user: userId,
      comment: text,
      createdAt: new Date(),
    };

    task.comments.push(comment);
    await task.save();

    // Populate user info for response
    await task.populate("comments.user", "name avatar");
    const newComment = task.comments[task.comments.length - 1];

    res.status(201).json({ comment: newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

