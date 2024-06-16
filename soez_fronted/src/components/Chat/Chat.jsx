import React, { useEffect, useState } from 'react';
import { Box, List, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Message from './Message';
import MessageForm from './MessageForm';
import { getCurrentUserData } from '../../services/ProfileService';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
}));

const ChatBox = styled(Paper)(({ theme }) => ({
    height: '500px',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
}));

const MessageFormContainer = styled(Box)(({ theme }) => ({
    marginTop: '20px',
}));

const initialMessages = [
    {
        id: 1,
        user: {
            id: 2,
            name: 'Jane Smith',
            avatar: 'https://via.placeholder.com/40'
        },
        text: 'Hello, everyone!',
        timestamp: '2023-06-10T10:00:00Z',
    },
    {
        id: 2,
        user: {
            id: 1,
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/40'
        },
        text: 'Hi, Jane!',
        timestamp: '2023-06-10T10:05:00Z',
    },
];

const Chat = (tripId) => {

    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [currentUser, setCurrentUser] = useState({
        id: '',
        name: '',
        avatar: null
    });

    const fetchUserData = async () => {
        const data = await getCurrentUserData();
        setCurrentUser({
            id: data.id,
            name: `${data.firstName} ${data.lastName}`,
            avatar: null
        })
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    const handleSendMessage = (text) => {
        const newMessage = {
            id: messages.length + 1,
            user:currentUser,
            text,
            timestamp: new Date().toISOString(),
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <ChatContainer>
            <ChatBox>
                <List>
                    {messages.map((msg) => (
                        <Message key={msg.id} message={msg} currentUser={currentUser} />
                    ))}
                </List>
            </ChatBox>
            <MessageFormContainer>
                <MessageForm onSendMessage={handleSendMessage} />
            </MessageFormContainer>
        </ChatContainer>
    );
};

export default Chat;