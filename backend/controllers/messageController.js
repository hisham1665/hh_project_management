import Message from "../models/messages.model.js";

export const addMessage = async (req, res) => {
  try {
    const { projectId, content , userId} = req.body;

    if (!projectId || !content) {
      return res.status(400).json({ message: 'Project ID and content are required.' });
    }

    // Assuming you have a Message model to handle messages
    const newMessage = await Message.create({
      project : projectId,
      sender : userId,
      content,
      createdAt: new Date(),
    });

    const io = req.app.get('io');
    io.to(projectId).emit('messageEvent', { type: 'add', message: newMessage });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getMessages = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required.' });
    }

    const messages = await Message.find({ project: projectId })
      .populate('sender', 'name avatarIndex') // Assuming you want to populate sender details
      .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
    
        if (!messageId) {
        return res.status(400).json({ message: 'Message ID is required.' });
        }
    
        const message = await Message.findByIdAndDelete(messageId);
        if (!message) { 
            return res.status(404).json({ message: 'Message not found.' });
        }

        const io = req.app.get('io');
        io.to(message.project.toString()).emit('messageEvent', { type: 'delete', message });

        res.status(200).json({ message: 'Message deleted successfully.' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;

    if (!messageId || !content) {
      return res.status(400).json({ message: 'Message ID and content are required.' });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    const io = req.app.get('io');
    io.to(updatedMessage.project.toString()).emit('messageEvent', { type: 'update', message: updatedMessage });

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}