// here is where the chatroom page is gonna be served, start rendering video componenent and chat component here
import React, { useState } from "react";

import ChatBox from "@/components/chat/chatBox"
import VideoBox from "@/components/video/videoBox"

type chatBoxStateType = {
  messages: {
    user: string,
    content: string
  }[],
  activeUsers: string[];
};
// intialize chatbox state with dummy data


export default function Chatroom() {
  
  
  const chatBoxState: chatBoxStateType = {
    messages: [
      {
        user: 'Jiyoung',
        content: 'Yo!'
      },
      {
        user: 'Sunny',
        content: 'Yo'
      },
      {
        user: 'Alwin',
        content: 'wazgud'
      },
      {
        user: 'Ben',
        content: 'Sup'
      },
      {
        user: 'Waisan',
        content: 'Ni haody!'
      }
    ],
    activeUsers: ['Waisan', 'Sunny', 'Alwin', 'Jiyoung', 'Ben']
  };
  
  const [state, setState] = useState(chatBoxState);
  return (
    <div>
      <ChatBox state={state} setState={setState}></ChatBox>
      <VideoBox></VideoBox>
    </div>
  )
};