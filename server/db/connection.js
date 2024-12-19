const mongoose = require("mongoose");

// const databaseName = process.env.DATABASE || 'default_db';
// Connect MongoDB
// mongoose.connect(`${process.env.MONGO_URI}/${databaseName}`)
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log(`Connected to MongoDB Database`))
        .catch(err => console.log('Server MongoDB Connection Error: ', err));

}
module.exports = { connectDB };