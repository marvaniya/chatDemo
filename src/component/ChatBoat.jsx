const ChatBoat = ({getRequest,question,setQuestion}) => {
    return (
        <>
            <div className="chatbar-wrapper">
                <div className="chatbar">
                    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="chatbar-input" placeholder="Ask anything" />
                    <span className="chatbar-actions">
                        <button onClick={getRequest}><span className="chatbar-icon bg_icon"><img src="src/assets/arrow_cross.svg" /></span></button>
                    </span>
                </div>
            </div>
        </>
    )
}
export default ChatBoat