import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import ChatList from "./Chat/ChatList";


function Main() {
    return (
        <section className="main">
            <Container>
                <div className="main-container" style={{display: 'flex',}}>
                    <div className="left-block">
                        <ChatList/>
                    </div>
                    <div className="right-block">
                        <div className="chat-container">
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default Main;
