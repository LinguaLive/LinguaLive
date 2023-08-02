import React, {useState} from 'react';
import ChatFeed from './chatFeed';
import ChatInput from './chatInput';



// this is where chatbox portion of the chatroom page lives




// fetch for chatroom info from db or let it be passed in from higher up??? / websocket data

// chatbox will render ChatFeed, ChatInput, ChatSendButton
export default function ChatBox(prop) {
  return (
    <div>
      ChatBox
      <ChatFeed state={prop.state}></ChatFeed>
      <ChatInput state={prop.state} setState={prop.setState}></ChatInput>
    </div>
  )
}

