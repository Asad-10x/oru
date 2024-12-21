const userModel = require('./userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Authenticate user and generate JWT
const loginUserInDB = async (email, password) => {
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        return { token, user };
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
};

// Verify JWT and return user data
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        console.error('Invalid token:', error.message);
        throw new Error('Unauthorized');
    }
};

// Fetch all users from the database
const getDataFromDB = async () => {
    try {
        //console.log('Fetching all users from the database...');
        const users = await userModel.find({});
        console.log('Users fetched successfully:', users);
        return users;
    } catch (error) {
        console.error('Error fetching users from DB:', error.message);
        throw new Error('Database error: Unable to fetch users');
    }
};

// Create a new user in the database
const createUserInDB = async (userData) => {
    try {
        //console.log('Saving new user to the database...');
        const newUser = new userModel(userData);
        await newUser.save();
        console.log('User saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving user to DB:', error.message);
        throw new Error('Database error: Unable to save user');
    }
};

module.exports = { getDataFromDB, createUserInDB, loginUserInDB, verifyToken };
