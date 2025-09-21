import { Link } from "react-router-dom"
import { toggleSidebar } from "../component/SideBar";

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="cust_flex">
                    <div className="header_left">
                      
                    </div>
                </div>
                <div>
                    <div className="right_header">
                        <div className="profile_div">
                            <div className="profile_name">
                                <img src="src/assets/profile.svg" className="profile_icon" />
                                 <h4>Dharmik Marvaniya</h4>    
                            </div>
                            <ul className="user_action">
                                <li>
                                    <Link to={"/signin"}><img src="src/assets/profile.svg" className="sign_icon"/>Logout</Link>
                                </li>
                            </ul>
                        </div>
                        <img src="src/assets/hamburger.svg" onClick={toggleSidebar} className="toggle_btn" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header