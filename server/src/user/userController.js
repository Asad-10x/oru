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
        const { f_name, l_name, email, password, role } = req.body;

        // Validate required fields
        if (!f_name || !l_name || !email || !password) {
            return res.status(400).json({ 
                status: false, 
                message: 'First name, last name, email, and password are required.' 
            });
        }

        // Create user in the database
        const status = await userService.createUserInDB(req.body);

        if (status) {
            return res.status(201).json({ 
                status: true, 
                message: 'User created successfully!' 
            });
        }

        // Handle unexpected failure to create user
        return res.status(400).json({ 
            status: false, 
            message: 'Failed to create user. Please try again.' 
        });

    } catch (err) {
        console.error('Error creating user:', err.message);
        return res.status(500).json({ 
            status: false, 
            message: 'Internal server error' 
        });
    }
};


// Login user
const loginControllerFn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Email and password are required' });
        }

        const { token, user } = await userService.loginUserInDB(email, password);

        res.status(200).json({
            status: true,
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(401).json({ status: false, message: err.message });
    }
};

module.exports = { getDataControllerfn, createDataControllerfn, loginControllerFn };
