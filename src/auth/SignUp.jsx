import { Link } from "react-router-dom"

const SignUp = () => {
    return (
        <>
            <div className="auth_section">
                <div className="form_section">
                    <div className="form_left_section">
                        <div className="full_logo">
                            <img src="src/assets/robot.png" className=""/>
                            <h3 className="typewriter">Welcome back. Please sign up to continue.</h3>
                        </div>
                    </div>
                    <div className="form_right_section">
                        <form>
                            <div className="form_auth_section">
                            <h4>Sign Up</h4>
                                <div className="form_box">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="Enter Your Full Name" className="input_box"/>
                                </div>
                                <div className="form_box">
                                    <label>Email</label>
                                    <input type="text" placeholder="Enter Your Email Address" className="input_box"/>
                                </div>
                                <div className="form_box">
                                    <label>Password</label>
                                    <input type="text" placeholder="Enter Your Password" className="input_box"/>
                                </div>
                                <div className="form_box">
                                    <label>Confirm Password</label>
                                    <input type="text" placeholder="Enter Your Confirm Password" className="input_box"/>
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
            </div>
        </>
    )
}

export default SignUp