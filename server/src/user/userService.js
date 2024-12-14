const userModel = require('./userModel');

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

module.exports = { getDataFromDB, createUserInDB };
