import { Link } from "react-router-dom";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import ChatBoat from "../component/ChatBoat";

const Chat = () => {
    return (
        <div className="main_wrapper">
            <SideBar />
            <div className="inner_wrapper">
                <Header />
                <div className="index_header"></div>
                <div className="inner_content">
                    <div className="inner_body_section chat_div">
                        <div className="chat_section">
                            {/* <div className="no_chat_found">
                                <img src="src/assets/no-comment.png"/>
                                <h4>No Chat Found</h4>
                            </div> */}
                            <div className="own_chat">
                                <div className="own_chat_text">
                                    <h3>Hello</h3>
                                </div>
                            </div>
                            <div className="chat_replay">
                                <div className="chat_replay_text">
                                    <div className="chat_action">
                                        <Link to="#"><img src="src/assets/copy.svg" />Copy</Link>
                                        <Link to="#"><img src="src/assets/export.svg" />Export PDF</Link>
                                    </div>
                                    <h3>How can I help you?</h3>
                                </div>
                            </div>
                            <div className="own_chat">
                                <div className="own_chat_text">
                                    <h3>Hello</h3>
                                </div>
                            </div>
                            <div className="chat_replay">
                                <div className="chat_replay_text">
                                    <div className="chat_action">
                                        <Link to="#"><img src="src/assets/copy.svg" />Copy</Link>
                                        <Link to="#"><img src="src/assets/export.svg" />Export PDF</Link>
                                    </div>
                                    <h3>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                                        and
                                        scrambled it to make a type specimen book. It has survived not only five centuries,
                                    </h3>
                                </div>
                            </div>
                            <div className="own_chat">
                                <div className="own_chat_text">
                                    <h3>Hello</h3>
                                </div>
                            </div>
                            <div className="chat_replay">
                                <div className="chat_replay_text">
                                    <div className="chat_action">
                                        <Link to="#"><img src="src/assets/copy.svg" />Copy</Link>
                                        <Link to="#"><img src="src/assets/export.svg" />Export PDF</Link>
                                    </div>
                                    <h3>How can I help you?</h3>
                                </div>
                            </div>
                            <div className="own_chat">
                                <div className="own_chat_text">
                                    <h3>Hello</h3>
                                </div>
                            </div>
                            <div className="chat_replay">
                                <div className="chat_replay_text">
                                    <div className="chat_action">
                                        <Link to="#"><img src="src/assets/copy.svg" />Copy</Link>
                                        <Link to="#"><img src="src/assets/export.svg" />Export PDF</Link>
                                    </div>
                                    <h3>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                                        and
                                        scrambled it to make a type specimen book. It has survived not only five centuries,
                                    </h3>
                                </div>
                            </div>
                            <ChatBoat/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;