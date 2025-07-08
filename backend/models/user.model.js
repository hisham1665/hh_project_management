// models/User.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
},
  email: {
    type: String,
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ['admin', 'member'], 
    default: 'member' 
},
  // Optional, just for quick lookup
  createdProjects: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Project' 
}],
}, { timestamps: true });

userSchema.virtual('projectCount').get(function () {
  return this.createdProjects?.length || 0;
});
export default mongoose.model('User', userSchema);
