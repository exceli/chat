import React, {useEffect, useState} from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

function ChatList({onRoomSelect}) {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");

    useEffect(() => {
        axios
            .get('http://localhost:8000/chat')
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error('Не удалось получить список комнат:', error);
            });
    }, []);

    const selectRoom = (room) => {
        setSelectedRoom(room.name);
        console.log(room.name);
        // onRoomSelect(room.name);
    };

    return (
        <div>
            <h2>Список комнат</h2>
            <ListGroup>
                {rooms.map(room => (
                    <ListGroup.Item
                        key={room.id}
                        onClick={() => selectRoom(room)}
                        action
                        active={selectedRoom === room.name}
                    >
                        {room.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default ChatList;
