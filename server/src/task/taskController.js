const taskService = require('./taskService');

// Helper function for validation
const validateRequest = (data, requiredFields) => {
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
};

// Create a new task or sub-task
const createTask = async (req, res) => {
    try {
        const taskData = req.body;

        // Validate required fields
        validateRequest(taskData, ['title', 'assignedTo', 'status']);

        // Validate status
        if (!['pending', 'ongoing', 'completed'].includes(taskData.status)) {
            return res.status(400).json({ status: false, message: 'Invalid status value' });
        }

        const newTask = await taskService.createTaskInDB(taskData);
        res.status(201).json({ status: true, message: 'Task created successfully', data: newTask });
    } catch (error) {
        console.error('Error in createTaskController:', error.message);
        res.status(400).json({ status: false, message: error.message });
    }
};

// Fetch tasks or sub-tasks
const fetchTasks = async (req, res) => {
    try {
        const { status, parentTask, assignedTo } = req.query;

        // Validate the 'status' filter
        if (status && !['pending', 'ongoing', 'completed'].includes(status)) {
            return res.status(400).json({ status: false, message: 'Invalid status filter' });
        }

        // Validate the 'parentTask' filter
        if (parentTask && !parentTask.match(/^[a-f\d]{24}$/i)) { // MongoDB ObjectId format
            return res.status(400).json({ status: false, message: 'Invalid parentTask ID' });
        }

        // Validate the 'assignedTo' filter
        if (assignedTo && !assignedTo.match(/^[a-f\d]{24}$/i)) {
            return res.status(400).json({ status: false, message: 'Invalid assignedTo ID' });
        }

        // Build filter dynamically based on provided query parameters
        const filter = {};
        if (status) filter.status = status;
        if (parentTask) filter.parentTask = parentTask;
        if (assignedTo) filter.assignedTo = assignedTo;

        const tasks = await taskService.fetchTasksFromDB(filter);
        res.status(200).json({ status: true, data: tasks });
    } catch (error) {
        console.error('Error in fetchTasksController:', error.message);
        res.status(500).json({ status: false, message: 'Failed to fetch tasks' });
    }
};


// Update task status
const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        // Validate input
        if (!taskId) {
            return res.status(400).json({ status: false, message: 'Task ID is required' });
        }

        if (!status || !['pending', 'ongoing', 'completed'].includes(status)) {
            return res.status(400).json({ status: false, message: 'Invalid status value' });
        }

        const updatedTask = await taskService.updateTaskStatusInDB(taskId, status);
        res.status(200).json({ status: true, message: 'Task status updated successfully', data: updatedTask });
    } catch (error) {
        console.error('Error in updateTaskStatusController:', error.message);
        res.status(500).json({ status: false, message: 'Failed to update task status' });
    }
};

// Delete a task or sub-task
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Validate input
        if (!taskId) {
            return res.status(400).json({ status: false, message: 'Task ID is required' });
        }

        const deletedTask = await taskService.deleteTaskFromDB(taskId);
        res.status(200).json({ status: true, message: 'Task deleted successfully', data: deletedTask });
    } catch (error) {
        console.error('Error in deleteTaskController:', error.message);
        res.status(500).json({ status: false, message: 'Failed to delete task' });
    }
};

// Get task by Id
const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params; // Get taskId from the route parameter

        // Check if the taskId is valid
        if (!taskId) {
            return res.status(400).json({ status: false, message: 'taskId is required' });
        }

        const task = await taskService.getTaskByIdFromDB(taskId); // Call the service to get the task

        if (!task) {
            return res.status(404).json({ status: false, message: 'Task not found' });
        }

        res.status(200).json({ status: true, data: task });

    } catch (error) {
        console.error('Error fetching task:', error.message);
        res.status(500).json({ status: false, message: 'Failed to fetch task' });
    }
};


// Add a comment to a task
const addCommentToTask = async (req, res) => {
    try {

        const taskId = req.params.taskId;
        const { content } = req.body;

        // Validate input
        validateRequest({ taskId, commenter: req.user.id, content }, ['taskId', 'commenter', 'content']);

        const newComment = await taskService.addCommentToTaskInDB(taskId, { commenter: req.user.id, content });
        res.status(201).json({ status: true, message: 'Comment added successfully', data: newComment });
    } catch (error) {
        console.error('Error in addCommentToTaskController:', error.message);
        res.status(400).json({ status: false, message: error.message });
    }
};

module.exports = {
    createTask,
    fetchTasks,
    updateTaskStatus,
    deleteTask,
    addCommentToTask,
    getTaskById,
};
