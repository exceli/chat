import React, {useEffect, useRef, useState} from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

function Chat({room}) {
    const [chatLogContent, setChatLogContent] = useState([]);
    const [message, setMessage] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const chatSocketRef = useRef(null);
    const chatLogRef = useRef(null);
    const chatMessageInputRef = useRef(null);
    // TODO useReducer
    const connectWebSocket = () => {
        chatSocketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${room.name}/`);

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
                    setChatLogContent(prevChatLogContent => [
                        ...prevChatLogContent,
                        {type: "message", user: data.user, message: 'join the room'}
                    ]);
                    setOnlineUsers((prevOnlineUsers) => [...prevOnlineUsers, data.user]);
                    break;
                case "user_leave":
                    setChatLogContent(prevChatLogContent => [
                        ...prevChatLogContent,
                        {type: "message", user: data.user, message: 'left the room.'}
                    ]);
                    setOnlineUsers((prevOnlineUsers) => prevOnlineUsers.filter(user => user !== data.user));
                    break;
                case "chat_message":
                    setChatLogContent(prevChatLogContent => [
                        ...prevChatLogContent,
                        {type: "message", user: data.user, message: data.message}
                    ]);
                    break;
                case "private_message":
                    setChatLogContent(prevChatLogContent => [
                        ...prevChatLogContent,
                        {type: "message", user: 'PM from ' + data.user, message: data.message}
                    ]);
                    break;
                case "private_message_delivered":
                    setChatLogContent(prevChatLogContent => [
                        ...prevChatLogContent,
                        {type: "message", user: 'PM to ' + data.user, message: data.message}
                    ]);
                    break;
                case "chat_messages":
                    setChatLogContent(
                        data.messages
                            .reverse()
                            .map((message) => ({type: "message", user: message.user, message: message.content}))
                    );
                    break;
                default:
                    console.error("Unknown message type!");
                    break;
            }

            const chatLog = chatLogRef.current;
            // chatLog.scrollTop = chatLog.scrollHeight; TODO
        };

        chatSocketRef.current.onerror = (err) => {
            console.log("WebSocket encountered an error: " + err.message);
            console.log("Closing the socket.");
            chatSocketRef.current.close();
        };
    };

    useEffect(() => {
        if (room) {
            connectWebSocket();
        }
    }, [room]);

    const handleSendMessage = () => {
        if (message.length === 0) return;
        console.log(message);
        chatSocketRef.current.send(
            JSON.stringify({
                type: "chat_message",
                user: message,
                message: message,
            })
        );
        setMessage("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div>
            <div className="messages-container">
                <div className="messages-history" ref={chatLogRef}  style={maxHeight: maxH}>
                    <ChatHistory chatLogContent={chatLogContent}/>
                </div>
                <ChatInput
                    message={message}
                    setMessage={setMessage}
                    handleSendMessage={handleSendMessage}
                    handleKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default Chat;
