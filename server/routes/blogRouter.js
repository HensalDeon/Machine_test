import { Router } from "express";
const router = Router();

import * as blogsController from "../controllers/blogsController.js";

router.route("/get-all").get(blogsController.getAllBlogs); //get all blogs
router.route("/:blogId").delete(blogsController.deleteBlog); //delete blog
router.route("/:blogId").put(blogsController.updateBlog); //update blog
router.route("/:blogId").get(blogsController.getBlog); //get a blog
router.route("/:id/create").post(blogsController.createBlog); //create a blog
router.route("/excel").get(blogsController.blogDownload);
router.route("/upload").post(blogsController.csvToJson); //create a blog

export default router;
