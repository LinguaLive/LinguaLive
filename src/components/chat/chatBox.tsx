import React, {useState} from 'react';
import ChatFeed from './chatFeed';
import ChatInput from './chatInput';



// this is where chatbox portion of the chatroom page lives



// define chatbox state at highest level here
type chatBoxState = {
  messages: {
    user: string,
    content: string
  }[],
  activeUsers: string[];
}

// fetch for chatroom info from db or let it be passed in from higher up??? / websocket data

// chatbox will render ChatFeed, ChatInput, ChatSendButton
export default function ChatBox() {
  return (
    <div>
      ChatBox
      <ChatFeed></ChatFeed>
      <ChatInput></ChatInput>
    </div>
  )
}

