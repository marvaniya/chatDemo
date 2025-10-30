import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URLS, API_URL_BASE } from "../API";

const SignIn = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userSignIn = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${API_URL_BASE}${API_URLS.SIGN_IN}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })

            const result = await response.json()
            if (response.ok) {
                toast.success("Login successful!", { theme: "colored" });
                setTimeout(() => navigate("/"), 2000);
                localStorage.setItem('user', JSON.stringify(result.user));
            } else {
                toast.error(`${result.message}`, { theme: "colored" });
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Something went wrong! 😢", { theme: "colored" });
        }
    }

    return (
        <>
            <div className="auth_section">
                <div className="form_section">
                    <div className="form_left_section">
                        <div className="full_logo">
                            <img src="./assets/robot.png" className="" />
                            <h3 className="typewriter">Welcome back. Please sign in to continue.</h3>
                        </div>
                    </div>
                    <div className="form_right_section">
                        <form onSubmit={userSignIn}>
                            <div className="form_auth_section">
                                <h4>Sign In</h4>
                                <div className="form_box">
                                    <label>Email Address</label>
                                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Address" className="input_box" />
                                </div>
                                <div className="form_box">
                                    <label>Password</label>
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" className="input_box" />
                                </div>
                                <div className="form_box">
                                    <button className="auth_action_btn">Sign In</button>
                                </div>
                                <div className="move_to_page">
                                    Have an account?<Link to={"/signup"}>Sing Up</Link>
                                </div>
                                <div className="skip">
                                    <Link to={"/"}>Skip</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </>
    )
}

export default SignIn