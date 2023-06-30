import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import ChatList from "./Chat/ChatList";
import Chat from "./Chat/Chat";

function Main() {
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
    };

    return (
        <section className="main">
            <Container>
                <div className="main-container" style={{display: "flex"}}>
                    <div className="left-block">
                        <ChatList onRoomSelect={handleRoomSelect}/>
                    </div>
                    <div className="right-block">
                        {selectedRoom && <Chat room={selectedRoom}/>}
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default Main;
