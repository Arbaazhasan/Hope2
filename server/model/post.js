import mongoose, { mongo } from "mongoose";


const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        username: {
            type: String
        },
        desc: {
            type: String,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        comment: {
            type: Array,
            default: []
        }
    },

);

export const Post = mongoose.model("Post", PostSchema);