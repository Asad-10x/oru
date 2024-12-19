const mongoose=require("mongoose");
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
        type: String, 
        enum: ['pending', 'ongoing', 'completed'], 
        default: 'pending' 
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null }, // Link to parent task if this is a sub-task
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true,
    collection: 'tasks',
});

module.exports = mongoose.model('Task', taskSchema);
