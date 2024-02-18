const mongoose = require('mongoose');
const User = require('../models/user');
const UserData = require('../models/userData');
const ImageData = require('../models/imageData')
mongoose.connect('mongodb://localhost:27017/login-db', {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await UserData.deleteMany({})
    await ImageData.deleteMany({})
}

seedDB().then(() => {
    mongoose.connection.close();
})