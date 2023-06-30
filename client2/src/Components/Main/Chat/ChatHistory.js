import React from "react";
import Message from "./ChatMessage";

const messageStyles = {
  message: {
    display: "flex",
    marginBottom: "10px",
  },
  user: {
    fontWeight: "bold",
    marginRight: "5px",
  },
  content: {
    flex: "1",
  },
  userMessage: {
    textAlign: "right",
  },
  userRight: {
    marginLeft: "auto",
  },
};

function ChatHistory({ chatLogContent, currentUser }) {
  return (
    <div className="chat-history">
      {chatLogContent.map((message, index) => {
        const isUserMessage = message.user === currentUser;
        const messageStyle = isUserMessage ? { ...messageStyles.message, ...messageStyles.userMessage } : messageStyles.message;
        const userStyle = isUserMessage ? { ...messageStyles.user, ...messageStyles.userRight } : messageStyles.user;
        // TODO
        return (
          <Message key={index} messageStyle={messageStyle} userStyle={userStyle} user={message.user} content={message.message} />
        );
      })}
    </div>
  );
}

export default ChatHistory;
