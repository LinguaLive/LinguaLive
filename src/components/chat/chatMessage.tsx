export default function ChatMessage(prop) {
  // 
  return (
    <div>
      {`${prop.user}: ${prop.message}`}
    </div>
  )
}



// component for redering individual chat messages with user and content