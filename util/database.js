const mongoose = require("mongoose");
const User = require("../models/user");

// const mongodbURI = 'mongodb://127.0.0.1:27017'
const mongodbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.adoxnxs.mongodb.net/Shop?retryWrites=true&w=majority`;

// Establish Connection to MongoDB Server
mongoose.set("strictQuery", false);
mongoose
    .connect(mongodbURI)
    .catch((error) => {
        console.log(error);
        process.exit(0);
    });

// Create connection Object & Listen for Events
const mongoConnection = mongoose.connection;

mongoConnection.on("connected", async () => {
    console.log(`Application Connected to MongoDB Server.`);
    const user = await User.findOne();
    if (!user) {
        const newUser = new User({
            name: "Deepak Kamboj",
            email: "deepakkamboj6656@gmail.com"
        })
        await newUser.save()
    }
});

mongoConnection.on("disconnected", () => {
    console.error(`Application Disconnected from MongoDB Server.`);
});

// Disconnect MongoDB Server before quitting Application
process.on("SIGINT", async () => {
    await mongoConnection.close().catch((error) => {
        console.log(error);
    });
});

// Export Connection
module.exports = mongoConnection;
