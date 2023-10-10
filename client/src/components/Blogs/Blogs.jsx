import { useEffect, useState } from "react";
import "./Blogs.scss";
import { getAllBlogs } from "../../api/BlogRequest";
import Blog from "../Blog/Blog";
function Blogs() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getAllBlogs().then((res) => {
            setBlogs(res.data);
        });
    }, []);
    return (
        <div className="blogs-container">
            {blogs.map((blog) => (
                <Blog key={blog._id} data={blog} />
            ))}
        </div>
    );
}

export default Blogs;
