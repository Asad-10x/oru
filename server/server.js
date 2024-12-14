require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('MONGO_DB:', process.env.DATABASE);
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const routes = require('./route/routes.js');

// Initializing Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const databaseName = process.env.DATABASE || 'default_db';
// Connect MongoDB
mongoose.connect(`${process.env.MONGO_URI}/${databaseName}`)
.then(() => console.log(`Connected to MongoDB Database: ${databaseName}`))
.catch(err => console.log('Server MongoDB Connection Error: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost: ${PORT}`));
