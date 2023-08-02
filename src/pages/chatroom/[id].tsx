// here is where the chatroom page is gonna be served, start rendering video componenent and chat component here

import ChatBox from "@/components/chat/chatBox"
import VideoBox from "@/components/video/videoBox"

export default function Chatroom() {
  return (
    <div>
      <ChatBox></ChatBox>
      <VideoBox></VideoBox>
    </div>
  )
};