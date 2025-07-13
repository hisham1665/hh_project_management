// models/Project.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { 
    type: String, 
    required: true 
},
  description: String,
  
  createdBy: { 
    type: Schema.Types.ObjectId, ref: 'User', 
    required: true 
},
  
  members: [{ 
    user:{type: Schema.Types.ObjectId, 
    ref: 'User', },
    role: { 
      type: String, 
      enum: ['admin', 'member'], 
      default: 'member' 
},
}], // <-- scalable for future
  tasks: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Task' 
}],
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
