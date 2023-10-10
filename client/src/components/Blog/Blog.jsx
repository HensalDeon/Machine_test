import React, { useState } from "react";
import profile from "../../img/4.png";
import Modal from "react-bootstrap/Modal";
import "./Blog.scss";
import { deleteBlog, updateBlog } from "../../api/BlogRequest";
import toast from "react-hot-toast";
function Blog({ data }) {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const [show, setShow] = useState();
    const [text, setText] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        const inputValue = e.target.value;
        setText(inputValue);
    };
    const handleEdit = () => {
        updateBlog(text, data._id)
            .then(() => {
                handleClose();
                toast.success(<b>edited!!</b>);
            })
            .catch(() => {
                handleClose();
                toast.error(<b>couldn't update..!</b>);
            });
    };
    const handleDelete = () => {
        deleteBlog(data._id)
            .then((res) => {
                toast.success(<b>{res.data.message}</b>);
            })
            .catch(() => {
                toast.error(<b>couldn't Delete..!</b>);
            });
    };

    return (
        <article>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body style={{ width: "17rem" }}>
                    <label className="pt-2 pb-3 linear-gradient-text">edit Blog?</label>
                    <div className="Search">
                        <input type="text" name="description" value={text} onChange={handleChange} />
                        <span onClick={handleEdit} className="material-symbols-outlined text-black">
                            edit
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
            <img src={profile} />
            <div>
                <div className="name">
                    {" "}
                    <b>{data.user.username}</b>
                    {data.user._id === user._id && (
                        <>
                            <span onClick={handleShow} className="material-symbols-outlined px-4">
                                edit
                            </span>
                            <span onClick={handleDelete} className="material-symbols-outlined">
                                delete
                            </span>
                        </>
                    )}
                </div>
                <p>{data.text}</p>
            </div>
        </article>
    );
}

export default Blog;
