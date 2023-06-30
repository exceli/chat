import React from "react";

const messageStyles = {
  messageContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  message: {
    padding: "5px 10px",
    borderRadius: "10px",
  },
  user: {
    fontWeight: "bold",
    marginRight: "5px",
  },
  userMessageContainer: {
    marginLeft: "auto",
  },
};

function Message({ user, content, currentUser }) {
  const isUserMessage = user === currentUser;
  const messageContainerStyle = isUserMessage
    ? { ...messageStyles.messageContainer, ...messageStyles.userMessageContainer }
    : messageStyles.messageContainer;
  const messageStyle = isUserMessage ? { ...messageStyles.message, backgroundColor: "#e2f2ff" } : messageStyles.message;
  const userStyle = messageStyles.user;
  // TODO

  return (
    <div style={messageContainerStyle}>
      <div style={messageStyle}>
        <span style={userStyle}>{user}:</span>
        <span>{content}</span>
      </div>
    </div>
  );
}

export default Message;
