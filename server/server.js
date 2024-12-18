require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./route/userRoutes');
const taskRoutes = require("./route/taskRoutes");
const { connectDB } = require('./db/connection');

// Initializing Express app
const app = express();

//connect database
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/tasks",taskRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost: ${PORT}`));
