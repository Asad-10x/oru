const express = require('express');
const router = express.Router();
const taskController = require('../src/task/taskController');
const { verifyTokenMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Create a new task or sub-task
router.route('/create').post(verifyTokenMiddleware, roleMiddleware('Lead'), taskController.createTask);

// Fetch tasks (main tasks by default, or sub-tasks if parentTask is provided)
router.route('/getAll').get(verifyTokenMiddleware, taskController.fetchTasks);

// Get task by id
router.route('/:taskId').get(verifyTokenMiddleware, taskController.getTaskById);

// Update task status
router.route('/:taskId/status').patch(verifyTokenMiddleware, roleMiddleware('Lead'), taskController.updateTaskStatus);

// Delete a task or sub-task
router.route('/:taskId').delete(verifyTokenMiddleware, roleMiddleware('Lead'), taskController.deleteTask);

// Add a comment to a task
router.route('/:taskId/comment').post(verifyTokenMiddleware, roleMiddleware('Lead'), taskController.addCommentToTask);

module.exports = router;
