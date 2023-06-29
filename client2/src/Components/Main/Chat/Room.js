import React, { useEffect, useRef, useState } from "react";

const Room = ({ room }) => {
  const [chatLogContent, setChatLogContent] = useState("");
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const chatSocketRef = useRef(null);
  const chatLogRef = useRef(null);
  const chatMessageInputRef = useRef(null);

  const connectWebSocket = () => {
    const roomName = room.name.replace(/\s/g, '');
    chatSocketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
    console.log(chatSocketRef.current);

    chatSocketRef.current.onopen = () => {
      console.log("Successfully connected to the WebSocket.");
    };

    chatSocketRef.current.onclose = () => {
      console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...");
      setTimeout(() => {
        console.log("Reconnecting...");
        connectWebSocket();
      }, 2000);
    };

    chatSocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.type) {
        case "user_list":
          setOnlineUsers(data.users);
          break;
        case "user_join":
          setChatLogContent((prevChatLogContent) => prevChatLogContent + "\n" + data.user + " joined the room.\n");
          setOnlineUsers((prevOnlineUsers) => [...prevOnlineUsers, data.user]);
          break;
        case "user_leave":
          setChatLogContent((prevChatLogContent) => prevChatLogContent + data.user + " left the room.\n");
          setOnlineUsers((prevOnlineUsers) => prevOnlineUsers.filter(user => user !== data.user));
          break;
        case "chat_message":
          setChatLogContent((prevChatLogContent) => prevChatLogContent + data.user + ": " + data.message + "\n");
          break;
        case "private_message":
          setChatLogContent((prevChatLogContent) => prevChatLogContent + "PM from " + data.user + ": " + data.message + "\n");
          break;
        case "private_message_delivered":
          setChatLogContent((prevChatLogContent) => prevChatLogContent + "PM to " + data.target + ": " + data.message + "\n");
          break;
        case "chat_messages":
          setChatLogContent(data.messages
            .reverse()
            .map(message => message.user + ": " + message.content)
            .join("\n"));
          break;
        default:
          console.error("Unknown message type!");
          break;
      }

      const chatLog = chatLogRef.current;
      chatLog.scrollTop = chatLog.scrollHeight;
    };

    chatSocketRef.current.onerror = (err) => {
      console.log("WebSocket encountered an error: " + err.message);
      console.log("Closing the socket.");
      chatSocketRef.current.close();
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      chatSocketRef.current && chatSocketRef.current.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.length === 0) return;
    console.log(message);
    chatSocketRef.current.send(JSON.stringify({
      type: 'chat_message',
      user: message.user,
      message: message,
    }));
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="messages-container">
        <div className="messages-history" ref={chatLogRef}>
          {chatLogContent}
        </div>
        <div className="messages-input-group">
          <input
            type="text"
            className="form-control"
            id="chatMessageInput"
            placeholder="Enter your chat message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={chatMessageInputRef}
          />
          <button className="btn btn-success" id="chatMessageSend" type="button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
