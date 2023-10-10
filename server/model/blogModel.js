import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;
