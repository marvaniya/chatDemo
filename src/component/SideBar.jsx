import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
let externalToggle;

const Sidebar = () => {


    const [isOpen, setIsOpen] = useState(false);

    externalToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const location = useLocation();
    const [expandedPanels, setExpandedPanels] = useState([]);
    const [activeLink, setActiveLink] = useState("");

    const isHomePage = () => {
        const path = location.pathname.replace(/\/+$/, "") || "/";
        const homePaths = ["/", "/index", "/index.php", "/home", "/home.php"];
        return homePaths.includes(path.toLowerCase());
    };

    const resetSidebarState = (clearStorage = true) => {
        setExpandedPanels([]);
        setActiveLink("");
        if (clearStorage) {
            localStorage.removeItem("activeSidebarLink");
            localStorage.removeItem("expandedPanels");
        }
    };

    const saveExpandedPanels = (panels) => {
        setExpandedPanels(panels);
        localStorage.setItem("expandedPanels", JSON.stringify(panels));
    };

    useEffect(() => {
        if (isHomePage()) {
            resetSidebarState(true);
        } else {
            const savedActive = localStorage.getItem("activeSidebarLink");
            const savedPanels = JSON.parse(localStorage.getItem("expandedPanels") || "[]");
            if (savedActive) setActiveLink(savedActive);
            if (Array.isArray(savedPanels)) setExpandedPanels(savedPanels);
        }
    }, [location.pathname]);

    const togglePanel = (title) => {
        let updatedPanels;
        if (expandedPanels.includes(title)) {
            updatedPanels = expandedPanels.filter((p) => p !== title);
        } else {
            updatedPanels = [...expandedPanels, title];
        }
        saveExpandedPanels(updatedPanels);
    };

    const handleLinkClick = (text) => {
        setActiveLink(text);
        localStorage.setItem("activeSidebarLink", text);
    };

    return (
        <div className="sidebar" style={{ left: isOpen ? "0" : "-300px" }}>
            <Link to="/">
                <div className="sidebar-brand">
                     <img src="src/assets/robot.png" className="logo"/>
                    <span className="brand-title">ChatBot</span>
                </div>
            </Link>
            <hr />
            <div>
                <div className="menu-section">
                    <Link
                        to="/chat"
                        className="sidebar-item"
                    >
                        <img src="src/assets/edit.svg" className="sidebar_icons" alt="folder" />
                        <span>New chat</span>
                    </Link>
                    <Link
                        to="#"
                        className="sidebar-item"
                    >
                        <img src="src/assets/folder.svg" className="sidebar_icons" alt="folder" />
                        <span>New project</span>
                    </Link>

                    <div className={`sidebar-expandable ${expandedPanels.includes("Chats") ? "active" : ""}`}>
                        <div
                            className="sidebar-item expandable-toggle"
                            onClick={() => togglePanel("Chats")}
                        >
                            <img src="src/assets/folder.svg" className="sidebar_icons" alt="folder" />
                            <span>Chats</span>
                            <img src="src/assets/arrow.svg" className="chevron-icon" alt="arrow" />
                        </div>
                        <div className="expandable-content">
                            {["Div 01 - General Requirements", "Div 02 - Existing Conditions", "Div 03 - Concrete", "Div 04 - Masonry", "Div 05 - Metals"].map((text) => (
                                <Link
                                    key={text}
                                    to="#"
                                    className={activeLink === text ? "active" : ""}
                                    onClick={() => handleLinkClick(text)}
                                >
                                    {text}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

export const toggleSidebar = () => {
  if (externalToggle) externalToggle();
};