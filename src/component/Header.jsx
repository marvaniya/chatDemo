import { Link, useNavigate } from "react-router-dom"
import { toggleSidebar } from "../component/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const userLogout = () => {
        localStorage.removeItem('user');
        toast.success("Logout successful!", { theme: "colored" });
        setTimeout(() => navigate("/signin"), 2000);
    }


    return (
        <>
            <div className="header">
                <div className="cust_flex">
                    <div className="header_left">
                        {/* Your left header content */}
                    </div>
                </div>
                <div className="right_header">
                    <div className="profile_div">
                        <div className="profile_name">
                            <img src="./assets/profile.svg" className="profile_icon" />
                            <h4>{user?.fullName || "Guest"}</h4>
                        </div>
                        <ul className="user_action">
                            <li>
                                {
                                    user ? (
                                        <>
                                            <button onClick={userLogout} className="logout_btn">
                                                <img src="./assets/profile.svg" className="sign_icon" /> Logout
                                            </button></>
                                    ) : (
                                        <Link to="/signin" className="logout_btn">
                                            <img src="./assets/profile.svg" className="sign_icon" /> Sign In
                                        </Link>
                                    )
                                }

                            </li>
                        </ul>
                    </div>
                    <img src="./assets/hamburger.svg" onClick={toggleSidebar} className="toggle_btn" />
                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={2000} />

        </>
    )
}
export default Header