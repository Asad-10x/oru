const userService = require('./userService');

// Fetch all users
const getDataControllerfn = async (req, res) => {
    try {
        const userDetails = await userService.getDataFromDB();
        res.status(200).json({ status: true, data: userDetails });
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ status: false, message: 'Failed to fetch users' });
    }
};

// Create a new user
const createDataControllerfn = async (req, res) => {
    try {
        const status = await userService.createUserInDB(req.body);
        if (status) {
            res.status(201).json({ status: true, message: 'User created successfully!' });
        } else {
            res.status(400).json({ status: false, message: 'Error creating user.' });
        }
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

module.exports = { getDataControllerfn, createDataControllerfn };
