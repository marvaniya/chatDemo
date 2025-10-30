import { useState, useRef } from "react";

const ChatBoat = ({ getRequest, question, setQuestion }) => {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const geminiApiKey = import.meta.env.VITE_API_KEY; 

  const handleMicClick = async () => {
    if (recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop()); // mic બંધ

        setLoading(true);
        const text = await sendAudioToGemini(audioBlob);
        setQuestion(text || "");
        setLoading(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("🎙️ Mic error:", error);
      alert("Microphone permission allow કરો.");
    }
  };

  const sendAudioToGemini = async (audioBlob) => {
    try {
      const base64Audio = await blobToBase64(audioBlob);

      const body = {
        contents: [
          {
            parts: [
              { text: "Transcribe this spoken audio to text." },
              {
                inline_data: {
                  mime_type: "audio/webm",
                  data: base64Audio,
                },
              },
            ],
          },
        ],
      };

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          geminiApiKey,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log("🎧 Gemini response:", data);

      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.output_text ||
        ""
      );
    } catch (error) {
      console.error("Error sending to Gemini:", error);
      return "";
    }
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  return (
    <div className="chatbar-wrapper">
      <div className="chatbar">
        <button className="microphone" onClick={handleMicClick} disabled={loading}>
          <img
            src="./assets/microphon.svg"
            alt="mic"
            style={{
              filter: recording ? "invert(40%)" : "none",
              opacity: loading ? 0.6 : 1,
            }}
          />
        </button>

        <input
          type="text"
          value={loading ? "Processing..." : question}
          onChange={(e) => setQuestion(e.target.value)}
          className="chatbar-input"
          placeholder="Ask anything"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading && !recording) getRequest();
          }}
        />

        <span className="chatbar-actions">
          <button onClick={getRequest} disabled={loading || recording}>
            <span className="chatbar-icon bg_icon">
              <img src="./assets/arrow_cross.svg" alt="send" />
            </span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default ChatBoat;
