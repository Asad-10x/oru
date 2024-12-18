const express = require('express');
const router = express.Router();
const taskController = require('../src/task/taskController');
const { verifyTokenMiddleware } = require('../middleware/authMiddleware');

// Create a new task or sub-task
router.route('/create').post(verifyTokenMiddleware, taskController.createTask);

// Fetch tasks (main tasks by default, or sub-tasks if parentTask is provided)
router.route('/getAll').get(verifyTokenMiddleware, taskController.fetchTasks);

// Get task by id
router.route('/:taskId').get(verifyTokenMiddleware, taskController.getTaskById);

// Update task status
router.route('/:taskId/status').patch(verifyTokenMiddleware, taskController.updateTaskStatus);

// Delete a task or sub-task
router.route('/:taskId').delete(verifyTokenMiddleware, taskController.deleteTask);

// Add a comment to a task
router.route('/:taskId/comment').post(verifyTokenMiddleware, taskController.addCommentToTask);

module.exports = router;
