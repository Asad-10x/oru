const commentSchema = new Schema({
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true }, // Link comment to a task
    commenter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, {
    timestamps: true,
    collection: 'comments',
});

module.exports = mongoose.model('Comment', commentSchema);
