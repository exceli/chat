import React from "react";

function ChatInput({ message, setMessage, handleSendMessage, handleKeyDown }) {
  return (
    <div className="messages-input-group">
      <input
        type="text"
        className="form-control"
        id="chatMessageInput"
        placeholder="Enter your chat message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-success" id="chatMessageSend" type="button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;
