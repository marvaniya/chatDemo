const ChatBoat = () => {
    return (
        <>
            <div className="chatbar-wrapper">
                <div className="chatbar">
                    <input type="text" className="chatbar-input" placeholder="Ask anything" />
                    <span className="chatbar-actions">
                        <span className="chatbar-icon bg_icon"><img src="src/assets/arrow_cross.svg" /></span>
                    </span>
                </div>
            </div>
        </>
    )
}
export default ChatBoat