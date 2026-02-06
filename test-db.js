const mongoose = require('mongoose');

const uri = "mongodb+srv://Flipcart:flipcart123@flipcart.nznsylk.mongodb.net/flipcart?retryWrites=true&w=majority";

async function run() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(uri);
        console.log("SUCCESS: Connected to MongoDB!");
    } catch (error) {
        console.error("CONNECTION FAILED:", error.message);
        if (error.message.includes("ECONNREFUSED")) {
            console.log("\nPossibility 1: Your IP address is not whitelisted in MongoDB Atlas.");
            console.log("Possibility 2: Your internet blocks MongoDB connections.");
        }
    } finally {
        await mongoose.disconnect();
    }
}

run();
