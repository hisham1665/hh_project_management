import Task from '../models/task.model.js';
import Project from '../models/project.model.js';
import User from '../models/user.model.js';

// ✅ Create a new task
export const createTask = async (req, res) => {
  const { title, description, projectId, priority, status , dueDate, createdBy } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({ title, description, project: projectId, priority , status, dueDate, createdBy });

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
