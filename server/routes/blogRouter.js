import { Router } from "express";
const router = Router();   
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import * as blogsController from "../controllers/blogsController.js";

router.route("/get-all").get(blogsController.getAllBlogs); //get all blogs
router.route("/excel").get(blogsController.blogDownload); //download as excel
router.route("/:blogId").get(blogsController.getBlog); //get a blog


router.route("/:id/create").post(blogsController.createBlog); //create a blog
router.route("/upload").post(upload.single('csv'),blogsController.csvToJson); //create a blog

router.route("/:blogId").put(blogsController.updateBlog); //update blog

router.route("/:blogId").delete(blogsController.deleteBlog); //delete blog

export default router;
