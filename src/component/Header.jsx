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
                        <div>
                            <img src="src/assets/profile.svg" className="profile_icon" />
                        </div>
                        <img src="src/assets/hamburger.svg" onClick={toggleSidebar} className="toggle_btn" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header