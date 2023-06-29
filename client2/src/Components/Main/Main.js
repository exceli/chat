import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import ChatList from "./Chat/ChatList";
import ChatMessages from "./Chat/ChatMessages";

function Main() {
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room.name);
    };

    return (
        <section className="main">
            <Container>
                <div className="main-container" style={{display: "flex"}}>
                    <div className="left-block">
                        <ChatList onRoomSelect={handleRoomSelect}/>
                    </div>
                    <div className="right-block">
                        {selectedRoom && <ChatMessages room={selectedRoom}/>}
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default Main;
