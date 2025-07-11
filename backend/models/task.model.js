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
    enum: ['todo', 'in-progress', 'done' , 'dropped'], 
    default: 'todo' 
},
  createdBy: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
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
}, 
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  dueDate: Date,
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
