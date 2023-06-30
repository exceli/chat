import React, {useEffect, useState} from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

function ChatList({onRoomSelect}) {
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8000/chat")
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error("Не удалось получить список комнат:", error);
            });
    }, []);

    const selectRoom = (room) => {
        if (activeRoom && activeRoom.name === room.name) {
            setActiveRoom(null);
        } else {
            setActiveRoom(room);
            onRoomSelect(room);
        }
    };

    return (
        <div>
            <h2>Список комнат</h2>
            <ListGroup>
                {rooms.map((room) => (
                    <ListGroup.Item
                        key={room.id}
                        onClick={() => selectRoom(room)}
                        action
                        active={activeRoom && activeRoom.name === room.name}
                        // TODO
                    >
                        {room.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default ChatList;
