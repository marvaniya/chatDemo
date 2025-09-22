import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import ChatBoat from "../component/ChatBoat";

const Chat = () => {
    
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory]);

    const getRequest = async () => {
        if (!question.trim()) {
            setError("Please enter a question.");
            return;
        }

        setLoading(true);
        setError("");

        const requestData = {
            contents: [
                {
                    parts: [
                        {
                            text: question,
                        },
                    ],
                },
            ],
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": apiKey,
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data from the API");
            }

            const data = await response.json();

            const answer =
                data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer received.";

            setChatHistory((prev) => [...prev, { question, answer }]);
            setQuestion("");
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main_wrapper">
            <SideBar />
            <div className="inner_wrapper">
                <Header />
                <div className="index_header"></div>
                <div className="inner_content">
                    <div className="inner_body_section chat_div">
                        <div className="chat_section">

                            {chatHistory.length === 0 && !error && !loading && (
                                <div className="no_chat_found">
                                    <img src="src/assets/no-comment.png" alt="No chat" />
                                    <h4>No Chat Found</h4>
                                </div>
                            )}

                            {error && (
                                <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
                            )}

                            {loading && (
                                <div className="chat_loader">
                                    <div className="spinner"></div>
                                </div>
                            )}

                            {!loading &&
                                chatHistory.map((entry, index) => (
                                    <div
                                        key={index}
                                        ref={index === chatHistory.length - 1 ? lastMessageRef : null}
                                    >
                                        <div className="own_chat">
                                            <div className="own_chat_text">
                                                <h3>{entry.question}</h3>
                                            </div>
                                        </div>
                                        <div className="chat_replay">
                                            <div className="chat_replay_text">
                                                <div className="chat_action">
                                                    <Link to="#">
                                                        <img src="src/assets/copy.svg" alt="Copy" />Copy
                                                    </Link>
                                                    <Link to="#">
                                                        <img src="src/assets/export.svg" alt="Export PDF" />Export PDF
                                                    </Link>
                                                </div>
                                                <h3>{entry.answer}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            <ChatBoat
                                getRequest={getRequest}
                                question={question}
                                setQuestion={setQuestion}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
