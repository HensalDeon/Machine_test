import "./Auth.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { logIn, signUp } from "../../api/AuthRequest";
import { useNavigate } from "react-router-dom";

const loginValidation = Yup.object().shape({
    username: Yup.string()
        .trim()
        .min(5, "Minimum 5 characters are required for username")
        .max(20, "Cannot exceed 20 characters")
        .required("Username cannot be empty"),
    password: Yup.string()
        .trim()
        .min(8, "Minimum 6 characters required")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, "Password must contain at least one letter", "and one number")
        .required("Password cannot be empty"),
});
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .min(5, "Minimum 5 characters are required for username")
        .max(20, "Cannot exceed 20 characters")
        .required("Username cannot be empty"),
    password: Yup.string()
        .trim()
        .min(8, "Minimum 6 characters required")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, "Password must contain at least one letter", "and one number")
        .required("Password cannot be empty"),
});

const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);
    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className="Auth">
            <div className="a-left">
                <div className="Webname">
                    <h1>Blog App</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            {showLogin ? <LogIn toggleForm={toggleForm} /> : <SignUp toggleForm={toggleForm} />}
        </div>
    );
};
function LogIn({ toggleForm }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginValidation,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            values = await Object.assign(values);
            try {
                setLoading(true);
                const response = await logIn(values);
                if (response.status === 200) {
                    setLoading(false);
                    toast.success(<b>{response.data.message}</b>);
                    const user = response.data.user;
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("/");
                } else {
                    setLoading(false);
                    toast.error(<b>{response.data.error}</b>);
                }
            } catch (error) {
                setLoading(false);
                toast.error(<b>{error.response.data.error}</b>);
                console.error("An error occurred:", error);
            }
        },
    });
    return (
        <div className="a-right">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <form className="infoForm authForm" onSubmit={formik.handleSubmit}>
                <h3>Log In</h3>

                <div style={{ display: "flow" }}>
                    <input
                        {...formik.getFieldProps("username")}
                        type="text"
                        placeholder="Username"
                        className="infoInput"
                        name="username"
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div style={{ color: "red" }}>{formik.errors.username}</div>
                    )}
                </div>

                <div style={{ display: "flow" }}>
                    <input
                        {...formik.getFieldProps("password")}
                        type="password"
                        className="infoInput"
                        placeholder="Password"
                        name="password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: "red" }}>{formik.errors.password}</div>
                    )}
                </div>

                <div>
                    <span style={{ fontSize: "12px" }}>
                        Don&#39;t have an account?{" "}
                        <button onClick={toggleForm} style={{ border: "none", background: "inherit", cursor: "pointer" }}>
                            <b>Signup</b>
                        </button>
                    </span>
                    <button type="submit" className="button infoButton" disabled={loading}>
                        {loading ? "login..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}

LogIn.propTypes = {
    toggleForm: PropTypes.func.isRequired,
};

function SignUp({ toggleForm }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            values = await Object.assign(values);
            try {
                setLoading(true);
                const response = await signUp(values);
                if (response.status === 201) {
                    setLoading(false);
                    toast.success(<b>{response.data.message}</b>);
                    const user = response.data.newUser;
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("/");
                } else {
                    setLoading(false);
                    toast.error(<b>{response.data.error}</b>);
                }
            } catch (error) {
                setLoading(false);
                toast.error(<b>{error.response.data.error}</b>);
                console.error("An error occurred:", error);
            }
        },
    });
    return (
        <div className="a-right signup">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <form className="infoForm authForm" onSubmit={formik.handleSubmit}>
                <h3>Sign Up</h3>

                <div style={{ display: "flow" }}>
                    <input
                        {...formik.getFieldProps("username")}
                        type="text"
                        placeholder="Username"
                        className="infoInput"
                        name="username"
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div style={{ color: "red" }}>{formik.errors.username}</div>
                    )}
                </div>

                <div style={{ display: "flow" }}>
                    <input
                        {...formik.getFieldProps("password")}
                        type="password"
                        className="infoInput"
                        placeholder="Password"
                        name="password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: "red" }}>{formik.errors.password}</div>
                    )}
                </div>
                <div>
                    <span style={{ fontSize: "12px" }}>
                        Already have an account?{" "}
                        <button onClick={toggleForm} style={{ border: "none", background: "inherit", cursor: "pointer" }}>
                            <b>Login</b>
                        </button>
                    </span>
                    <button type="submit" className="button infoButton" disabled={loading}>
                        {loading ? "Signing..." : "SignUp"}
                    </button>
                </div>
            </form>
        </div>
    );
}

SignUp.propTypes = {
    toggleForm: PropTypes.func.isRequired,
};

export default Auth;
