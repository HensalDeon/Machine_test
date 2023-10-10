import BlogModel from "../model/blogModel.js";
import fs from "fs/promises";
import { fromString } from "csvtojson";
import path from "path";

import { generateBlogs } from "../config/excel.js";

// Creat new Post
export const createBlog = async (req, res) => {
    const id = req.params.id;
    const newBlog = new BlogModel({ text, user: id });
    try {
        await newBlog.save();
        res.status(200).json({ message: "blog created succesffully" });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get a blog
export const getBlog = async (req, res) => {
    const userId = req.params.userId;

    try {
        const blogs = await BlogModel.find({ user: userId }).exec();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json(error);
    }
};

//update the blog
export const updateBlog = async (req, res) => {
    const { blogId } = req.params;
    const { text } = req.body;

    try {
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, { text }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a post
export const deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate("user").exec();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// download blogs
export const blogDownload = async (req, res) => {
    try {
        const blogs = await BlogModel.find();

        const workbook = await generateBlogs(blogs);

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=blogs.xlsx");
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//csv to json
export const csvToJson = async (req, res) => {
    const csvData = req.file.buffer.toString("utf8");

    try {
        const jsonArray = await fromString(csvData);
        const jsonFile = JSON.stringify(jsonArray, null, 2);
        const filePath = path.join(__dirname, "output.json");

        await fs.writeFile(filePath, jsonFile);

        res.json({ message: "CSV file converted to JSON and saved as output.json" });
    } catch (error) {
        res.status(500).json({ error: "Error converting CSV to JSON" });
    }
};
