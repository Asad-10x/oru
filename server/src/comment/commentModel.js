const mongoose=require("mongoose");

const commentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }, // Link comment to a task
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, {
    timestamps: true,
    collection: 'comments',
});

module.exports = mongoose.model('Comment', commentSchema);
