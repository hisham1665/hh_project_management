import Project from '../models/project.model.js';
import User from '../models/user.model.js';

// ✅ Create a new project
export const createProject = async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    // Create project and add creator as the first member
    const project = await Project.create({
      name,
      description,
      createdBy: userId,
      members: [userId]
    });

    // Optionally push to user's createdProjects
    await User.findByIdAndUpdate(userId, {
      $push: { createdProjects: project._id }
    });

    res.status(201).json({
      message: 'Project created successfully',
      project
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