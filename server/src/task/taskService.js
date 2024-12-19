const Task = require('./taskModel');
const Comment = require('../comment/commentModel');

// Create a new task or sub-task
const createTaskInDB = async (taskData) => {
    try {
        const task = new Task(taskData);
        const savedTask = await task.save();
        return savedTask;
    } catch (error) {
        console.error('Error creating task:', error.message);
        throw new Error('Database error: Unable to create task');
    }
};

// Fetch tasks (main tasks or sub-tasks)
const fetchTasksFromDB = async (filter, populateFields = true) => {
    try {
        const query = Task.find(filter);
        if (populateFields) {
            query.populate('assignedTo', 'f_name l_name')
                .populate('createdBy', 'f_name l_name')
                .populate('comments');
        }
        const tasks = await query.exec();
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        throw new Error('Database error: Unable to fetch tasks');
    }
};


// Update task status
const updateTaskStatusInDB = async (taskId, status) => {
    try {
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    } catch (error) {
        console.error('Error updating task status:', error.message);
        throw new Error('Database error: Unable to update task status');
    }
};

// Delete a task or sub-task
const deleteTaskFromDB = async (taskId) => {
    try {

        // Find and delete the main task
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        // Find and delete all sub-tasks associated with the taskId
        const subTasks = await Task.deleteMany({ parentTask: taskId });
        if (subTasks.deletedCount > 0) {
            console.log(`${subTasks.deletedCount} sub-task(s) deleted.`);
        }

        console.log('Main task deleted successfully');
        return task;
    } catch (error) {
        console.error('Error deleting task:', error.message);
        throw new Error('Database error: Unable to delete task');
    }
};

// Get task by id
const getTaskByIdFromDB = async (taskId) => {
    try {
        const task = await Task.findById(taskId)
            .populate('assignedTo', 'f_name l_name')  // Populating fields
            .populate('createdBy', 'f_name l_name')  
            .populate('comments'); 

        return task;

    } catch (error) {
        console.error('Error fetching task from DB:', error.message);
        throw new Error('Database error: Unable to fetch task');
    }
};


// Delete sub-tasks of a parent task
const deleteSubTasksFromDB = async (parentTaskId) => {
    try {
        const result = await Task.deleteMany({ parentTask: parentTaskId });
        return result.deletedCount;
    } catch (error) {
        console.error('Error deleting sub-tasks:', error.message);
        throw new Error('Database error: Unable to delete sub-tasks');
    }
};

// Add a comment to a task
const addCommentToTaskInDB = async (taskId, commentData) => {
    try {
        const comment = new Comment({ taskId, ...commentData });
        const savedComment = await comment.save();

        // Push the comment ID into the task
        const task = await Task.findByIdAndUpdate(taskId, { $push: { comments: savedComment._id } });
        if (!task) {
            throw new Error('Task not found');
        }

        return savedComment;
    } catch (error) {
        console.error('Error adding comment to task:', error.message);
        throw new Error('Database error: Unable to add comment');
    }
};

module.exports = {
    createTaskInDB,
    fetchTasksFromDB,
    updateTaskStatusInDB,
    deleteTaskFromDB,
    deleteSubTasksFromDB,
    addCommentToTaskInDB,
    getTaskByIdFromDB
};
