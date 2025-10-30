import { use, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URLS, API_URL_BASE } from "../API";

const SignUp = () => {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const userSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL_BASE}${API_URLS.SIGN_UP}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: fullname, 
                    email,
                    password,
                    confirmPassword,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Registration successful!", { theme: "colored" });
                setTimeout(() => navigate("/signin"), 2000);
            } else {
                toast.error(`${result.message}`, { theme: "colored" });
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Something went wrong! 😢", { theme: "colored" });
        }
    };


    return (
        <>
            <div className="auth_section">
                <div className="form_section">
                    <div className="form_left_section">
                        <div className="full_logo">
                            <img src="./assets/robot.png" className="" />
                            <h3 className="typewriter">Welcome back. Please sign up to continue.</h3>
                        </div>
                    </div>
                    <div className="form_right_section">
                        <form onSubmit={userSignUp}>
                            <div className="form_auth_section">
                                <h4>Sign Up</h4>
                                <div className="form_box">
                                    <label>Full Name</label>
                                    <input type="text" name="fullName" onChange={(e) => setFullname(e.target.value)} placeholder="Enter Your Full Name" className="input_box" />
                                </div>
                                <div className="form_box">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Address" className="input_box" />
                                </div>
                                <div className="form_box">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" className="input_box" />
                                </div>
                                <div className="form_box">
                                    <label>Confirm Password</label>
                                    <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter Your Confirm Password" className="input_box" />
                                </div>
                                <div className="form_box">
                                    <button className="auth_action_btn">Sign Up</button>
                                </div>
                                <div className="move_to_page">
                                    Already have an account?<Link to={"/signin"}>Sing In</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer position="bottom-right" autoClose={2000}/>
            </div>
        </>
    )
}

export default SignUp