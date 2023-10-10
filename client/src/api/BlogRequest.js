import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5050" });

export const getAllBlogs = () => API.get("/blogs/get-all");
export const createBlog = (text, id) => API.post(`/blogs/${id}/create`, { text: text });
export const updateBlog = (text, blogId) => API.put(`/blogs/${blogId}`, { text: text });
export const deleteBlog = (blogId) => API.delete(`/blogs/${blogId}`);
export const getBlog = (userId) => API.get(`/blogs/${userId}`);
export const downloadBlog = () => API.get('/blogs/excel');
export const uploadCsv = () => API.post(`/blogs/upload`);
