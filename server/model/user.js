import mongoose from "mongoose";


// database COnnectivity 
mongoose.connect("mongodb://127.0.0.1:27017/", { dbName: "fullStackApp" }).then(() => {
    console.log("Database COnnected");
}).catch((e) => {
    console.log(e);
});

const appSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    bio: {
        type: String,
    },
    status: {
        type: String
    },
    lives: {
        type: String
    },
    work: {
        type: String
    },
    profilePicture: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    likedPosts: {
        type: Array,
        default: []
    },
    savedPosts: {
        type: Array,
        default: []
    },
    createat: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model("user", appSchema);
