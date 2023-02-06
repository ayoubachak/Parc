import React, { useState, useEffect } from "react";

const ChatTest = () => {
    const [chatMessages, setChatMessages] = useState([]);
    let ws;
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080/chat");
        ws.onopen = () => {
            console.log("WebSocket connected");
        };
        ws.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        };
        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };
    }, []);

    const handleSendMessage = (event) => {
        event.preventDefault();
        const message = event.target.elements.message.value;
        ws.send(JSON.stringify({ message }));
        event.target.elements.message.value = "";
    };

    return (
        <div>
            <ul>
                {chatMessages.map((message, index) => (
                    <li key={index}>{message.message}</li>
                ))}
            </ul>
            <form onSubmit={handleSendMessage}>
                <input type="text" name="message" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatTest;
