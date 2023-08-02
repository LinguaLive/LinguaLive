// this is where the feed div of the chatbox lives
import { JsxElement } from 'typescript';
import ChatMessage from './chatMessage'
// ChatFeed renders individual messages
export default function ChatFeed(prop) {
  const messages: React.JSX.Element[] = [];
  console.log(prop.state);
  prop.state.messages.forEach(element => {
    const message = (
    <ChatMessage message={element}></ChatMessage>
    );
    messages.push(message);
  });
  return (
    <div>
      ~~ChatFeed
      {messages}
    </div>
  )
}