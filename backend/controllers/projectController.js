import Project from '../models/project.model.js';
import User from '../models/user.model.js';

// ✅ Create a new project
export const createProject = async (req, res) => {
  const { name, description, userId, members } = req.body;

  try {
    // Filter out the creator if already added in the members list
    const filteredMembers = (members || []).filter(
      (id) => id !== userId
    );

    // Build the members array with roles
    const membersWithRoles = [
      { user: userId, role: 'admin' }, // Creator
      ...filteredMembers.map((memberId) => ({
        user: memberId,
        role: 'member',
      })),
    ];

    const project = await Project.create({
      name,
      description,
      createdBy: userId,
      members: membersWithRoles,
    });

    // Update the creator's profile
    await User.findByIdAndUpdate(userId, {
      $push: { createdProjects: project._id },
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ Get all projects where the user is a member
export const getUserProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    const projects = await Project.find({ members: userId })
      .populate('createdBy', 'name email')
      .select('-tasks');

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get single project by ID
export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId)
      .populate('members', 'name email')
      .populate('createdBy', 'name email')
      .populate('tasks');

    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add a member to the project
export const addMemberToProject = async (req, res) => {
  const { projectId } = req.params;
  const { memberId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Check if already a member
    if (project.members.includes(memberId)) {
      return res.status(400).json({ message: 'User already a member' });
    }

    project.members.push(memberId);
    await project.save();

    res.status(200).json({ message: 'Member added', project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Optional: Delete a project
export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const deleted = await Project.findByIdAndDelete(projectId);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const removeMemberFromProject = async (req, res) => {
  const { projectId } = req.params;
  const { memberId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Cannot remove the creator
    if (project.createdBy.toString() === memberId) {
      return res.status(403).json({ message: "Cannot remove the project creator" });
    }

    // Check if member exists in the project
    const memberIndex = project.members.findIndex(
      (id) => id.toString() === memberId
    );
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found in project' });
    }

    // Remove the member
    project.members.splice(memberIndex, 1);
    await project.save();

    res.status(200).json({
      message: 'Member removed successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProjectMembers = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate("members", "name email");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      members: project.members,
    });
  } catch (error) {
    console.error("Error fetching project members:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create Task and add to Project
export const addTaskToProject = async (req, res) => {
  try {
    const {  title, description, priority, status, dueDate, createdBy } = req.body;
    const { projectId } = req.params;
    // 1. Create the task
    const newTask = await Task.create({
      title,
      description,
      project: projectId,
      priority,
      status,
      dueDate,
      createdBy
    });

    // 2. Add the task's ObjectId to the project's tasks array
    await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: newTask._id }
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Add Task Error:", error);
    res.status(500).json({ error: error.message });
  }
};
