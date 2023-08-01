import { useContext } from 'react';
import { RoomContext } from '@/context/RoomContext';

function TestSocket() {
  const { ws } = useContext(RoomContext);
  const joinRoom = () => {
    ws.send(JSON.stringify({type: 'join-room', room: 'testroom'}));
  };

  return (
    <div>
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}

export default TestSocket;
