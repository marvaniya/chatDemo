import { useState, useRef } from "react";

const ChatBoat = ({ getRequest, question, setQuestion }) => {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const geminiApiKey = import.meta.env.VITE_API_KEY;
  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY; 

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
        stream.getTracks().forEach((t) => t.stop());
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
          headers: { "Content-Type": "application/json" },
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


  const generateImageOpenAI = async (prompt) => {
    try {
      setGeneratedImage(null);
      setLoading(true);

      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          size: "1024x1024",
        }),
      });

      const data = await res.json();
      console.log("🖼️ OpenAI image response:", data);

      const img = data?.data?.[0]?.url;
      if (img) setGeneratedImage(img);
      else alert("Image not generated — try describing it more clearly.");
    } catch (err) {
      console.error("Image generation error:", err);
      alert("Error generating image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const handleSend = () => {
    const lower = question.toLowerCase();
    if (lower.includes("image") || lower.includes("photo")) {
      generateImageOpenAI(question);
    } else {
      getRequest();
    }
  };

  return (
    <div className="chatbar-wrapper">
      <div className="chatbar">
        <button className="microphone" onClick={handleMicClick} disabled={loading}>
          <img
            src={`${import.meta.env.BASE_URL}assets/microphon.svg`}
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
          placeholder="Ask anything or say 'Generate an image'"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading && !recording) handleSend();
          }}
        />

        <span className="chatbar-actions">
          <button onClick={handleSend} disabled={loading || recording}>
            <span className="chatbar-icon bg_icon">
              <img
                src={`${import.meta.env.BASE_URL}assets/arrow_cross.svg`}
                alt="send"
              />
            </span>
          </button>
        </span>
      </div>

      {generatedImage && (
        <div className="generated-image">
          <h4>🖼️ Generated Image:</h4>
          <img
            src={generatedImage}
            alt="Generated"
            style={{
              maxWidth: "400px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBoat;
