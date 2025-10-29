import { useState, useRef } from "react";

const ChatBoat = ({ getRequest, question, setQuestion }) => {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL; // Replace with your Gemini-2 audio endpoint

    const handleMicClick = async () => {
        if (recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                audioChunksRef.current = [];

                mediaRecorder.ondataavailable = (e) => {
                    audioChunksRef.current.push(e.data);
                };

                mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                    const text = await sendAudioToAPI(audioBlob);
                    setQuestion(text || "");
                };

                mediaRecorder.start();
                mediaRecorderRef.current = mediaRecorder;
                setRecording(true);
            } catch (err) {
                console.error("Microphone error:", err);
                alert("Cannot access microphone. Please check permissions.");
            }
        }
    };

    const sendAudioToAPI = async (audioBlob) => {
        try {
            const formData = new FormData();
            formData.append("audio", audioBlob);

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "X-goog-api-key": apiKey,
                },
                body: formData,
            });

            const data = await response.json();
            // Adjust this depending on your API response structure
            return data.transcript || data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        } catch (err) {
            console.error("Error sending audio:", err);
            return "";
        }
    };

    return (
        <div className="chatbar-wrapper">
            <div className="chatbar">
                <button
                    className="microphone"
                    onClick={handleMicClick}
                >
                    <img
                        src="src/assets/microphon.svg"
                        alt="mic"
                        style={{ filter: recording ? "invert(40%)" : "none" }}
                    />
                </button>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="chatbar-input"
                    placeholder="Ask anything"
                />
                <span className="chatbar-actions">
                    <button onClick={getRequest}>
                        <span className="chatbar-icon bg_icon">
                            <img src="src/assets/arrow_cross.svg" />
                        </span>
                    </button>
                </span>
            </div>
        </div>
    );
};

export default ChatBoat;
