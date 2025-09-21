import { Link } from "react-router-dom"

const SignIn = () => {
    return (
        <>
            <div className="auth_section">
                <div className="form_section">
                    <div className="form_left_section">
                        <div className="full_logo">
                            <img src="src/assets/robot.png" className="" />
                            <h3 className="typewriter">Welcome back. Please sign in to continue.</h3>
                        </div>
                    </div>
                    <div className="form_right_section">
                        <form>
                            <div className="form_auth_section">
                                <h4>Sign In</h4>
                                <div className="form_box">
                                    <label>Email Address</label>
                                    <input type="text" placeholder="Enter Your Email Address" className="input_box" />
                                </div>
                                <div className="form_box">
                                    <label>Password</label>
                                    <input type="text" placeholder="Enter Your Password" className="input_box" />
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
        </>
    )
}

export default SignIn