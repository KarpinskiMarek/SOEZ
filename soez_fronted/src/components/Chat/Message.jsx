import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const MessageItem = styled(ListItem)(({ theme }) => ({
  marginBottom: '10px',
}));

const MyMessage = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '15px',
  borderRadius: '10px',
  alignSelf: 'flex-end',
}));

const OtherMessage = styled(Paper)(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  padding: '15px',
  borderRadius: '10px',
}));

const Message = ({ message, currentUser }) => {

  const isMyMessage = message.userId === currentUser.id;

  return (
    <MessageItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <>
        {isMyMessage ? (
          <MyMessage component="div">
            <ListItemText
              primary={message.content}
              secondary={
                <>
                  <Typography component="span" variant="body3" color="textPrimary">
                    {message.sender}
                  </Typography>
                </>
              }
            />
          </MyMessage>
        ) : (
          <OtherMessage component="div">
            <ListItemText
              primary={message.content}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {message.sender}
                  </Typography>
                  {" — "}
                </>
              }
            />
          </OtherMessage>
        )}
      </>
    </MessageItem>
  );
};

export default Message;