import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const MessageItem = styled(ListItem)(({ theme }) => ({
  marginBottom: '10px',
}));

const MyMessage = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '10px',
  borderRadius: '10px',
  alignSelf: 'flex-end',
}));

const OtherMessage = styled(Paper)(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  padding: '10px',
  borderRadius: '10px',
}));

const Message = ({ message, currentUser }) => {
  
 const isMyMessage = message.user.id === currentUser.id;

  return (
    <MessageItem>
      <ListItemAvatar>
        <Avatar src={message.user.avatar} alt={message.user.name} />
      </ListItemAvatar>
      <Paper component="div" className={isMyMessage ? MyMessage : OtherMessage}>
        <ListItemText
          primary={message.text}
          secondary={
            <>
              <Typography component="span" variant="body2" color="textPrimary">
                {message.user.name}
              </Typography>
              {" — "}
              {new Date(message.timestamp).toLocaleString()}
            </>
          }
        />
      </Paper>
    </MessageItem>
  );
};

export default Message;