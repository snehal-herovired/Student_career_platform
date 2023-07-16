const mongoose = require("mongoose");
const configDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log("An Error occured!", error);
        process.exit(1);
    }
};

module.exports = { configDb };