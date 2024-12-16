require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./route/userRoutes');

// Initializing Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/users",userRoutes);

// const databaseName = process.env.DATABASE || 'default_db';
// Connect MongoDB
// mongoose.connect(`${process.env.MONGO_URI}/${databaseName}`)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(`Connected to MongoDB Database`))
.catch(err => console.log('Server MongoDB Connection Error: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost: ${PORT}`));
