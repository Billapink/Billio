import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import NavBar from './NavBar';
import Header from './Header';
import { UserContext } from './UserContext';

// Connect to the Flask-SocketIO server
const socket = io('https://billio-backend-376ef0cff770.herokuapp.com', {
    transports: ['websocket'],
  });

function Chat() {
    const [messages, setMessages] = useState([]); // List of messages
    const [newMessage, setNewMessage] = useState(''); // Message input

    const userData = useContext(UserContext);

    useEffect(() => {
        // Listen for the connection response from the server
        socket.on('connection_response', (data) => {
            console.log(data.message); // Log welcome message
        });

        // Listen for messages broadcast by the server
        socket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]); // Add new message to state
        });

        return () => {
            socket.off('connection_response');
            socket.off('receive_message');
        };
    }, []);

    const sendMessage = () => {
        if (newMessage.trim()) {
            const messageData = { sender: userData.username, content: newMessage }; // Example sender
            socket.emit('send_message', messageData); // Send the message to the server
            setNewMessage(''); // Clear the input field
        }
    };

    return (
        <div className='max-h-screen'>
            <Header/>
            <div className=' pt-[100px] flex justify-center'>
            <h2 className='text-black font-bold text-3xl'>Chat</h2>
            </div>
            <div style={{ border: '1px solid gray', padding: '10px', height: '200px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div className='text-black' key={index}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            
            <div className='p-2'>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className='px-2 py-1 rounded-lg text-black'
                style={{ marginRight: '10px' }}
            />
            <button className='px-3 py-1 rounded-lg bg-blue-900 hover:bg-blue-500' onClick={sendMessage}>Send</button>
            </div>
            <div className='fixed bottom-0 left-0 right-0'>
            <NavBar/>
            </div>
            
        </div>
        
    );
}

export default Chat;
