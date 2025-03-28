import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: ()=> new Date() },
  dueDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
},{timestamps: true});
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
