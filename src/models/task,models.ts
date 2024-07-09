import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
