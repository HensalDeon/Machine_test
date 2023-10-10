import { useState } from "react";
import Blogs from "../../components/Blogs/Blogs";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import "./Modal.scss";
import Modal from "react-bootstrap/Modal";
import { createBlog, downloadBlog } from "../../api/BlogRequest";
import toast, { Toaster } from "react-hot-toast";

function Home() {
    const [show, setShow] = useState();
    const [text, setText] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        const inputValue = e.target.value;
        setText(inputValue);
    };
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const handleCreate = () => {
        createBlog(text, user._id)
            .then((res) => {
                handleClose();
                toast.success(<b>{res.data.message}</b>);
            })
            .catch(() => {
                toast.error(<b>Something went wrong</b>);
            });
    };

    const handleDownload = () => {
        downloadBlog();
    };
    return (
        <main>
            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body style={{ width: "17rem" }}>
                    <label className="pt-2 pb-3 linear-gradient-text">Create Blog?</label>
                    <div className="Search">
                        <input type="text" name="description" value={text} onChange={handleChange} />
                        <span onClick={handleCreate} className="material-symbols-outlined">
                            add_circle
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
            <Navbar />
            <div style={{ display: "flex", gap: "1rem", paddingBottom: "2rem" }}>
                <button className="button infoButton" onClick={handleShow}>
                    Create Blog
                </button>
                <button className="button" onClick={handleDownload}>
                    Dwonload blog
                </button>
                <form action="/upload" method="POST" encType="multipart/form-data">
                    <div style={{ display: "flex" }}>
                        <input type="file" name="csvFile" accept=".csv" required />
                        <button type="submit csv" className="button">
                            Convert and Upload
                        </button>
                    </div>
                </form>
            </div>
            <Blogs />
        </main>
    );
}

export default Home;
