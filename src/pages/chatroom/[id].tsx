// here is where the chatroom page is gonna be served, start rendering video componenent and chat component here

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
const chatBoxState: chatBoxStateType = {
  messages: [
    {
      user: 'Waisan',
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

export default function Chatroom(chatBoxState: chatBoxStateType) {
  return (
    <div>
      <ChatBox state={chatBoxState}></ChatBox>
      <VideoBox></VideoBox>
    </div>
  )
};