const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
        type: String, 
        enum: ['pending', 'ongoing', 'completed'], 
        default: 'pending' 
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    parentTask: { type: Schema.Types.ObjectId, ref: 'Task', default: null }, // Link to parent task if this is a sub-task
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true,
    collection: 'tasks',
});

module.exports = mongoose.model('Task', taskSchema);
