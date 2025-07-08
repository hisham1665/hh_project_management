// models/Task.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { 
    type: String, 
    required: true 
},
  description: String,
  status: { 
    type: String, 
    enum: ['todo', 'in-progress', 'done'], 
    default: 'todo' 
},
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'very-high'], 
    default: 'medium' 
},
  project: { 
    type: Schema.Types.ObjectId, 
    ref: 'Project', 
    required: true 
},
  assignedTo: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
}, // optional
  dueDate: Date,
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
