const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const {
            MONGO_SERVER,
            MONGO_USERNAME,
            MONGO_PASSWORD,
            MONGO_DATABASE,
            MONGO_AUTHFROM,
        } = process.env;

        const uri = `${MONGO_SERVER}:27017/${MONGO_DATABASE}`;

        const conn = await mongoose.connect(uri, {
            user: MONGO_USERNAME,
            pass: MONGO_PASSWORD,
            authSource: MONGO_AUTHFROM,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}/${MONGO_DATABASE}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;