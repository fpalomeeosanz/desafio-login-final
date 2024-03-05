import mongoose from "mongoose";

const collection = "user";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    password: String,
    email: {
        type: String,
        unique: true,
    },
    thumbnail: String,
    role: {
        type: String,
        enum: ["user","admin","fpalomerosanz" ],
        default: "user"
    },
});

const userModel = mongoose.model(collection,userSchema);

export default userModel;