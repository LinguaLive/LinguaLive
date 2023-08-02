'use client';

import { useEffect, useState, useContext } from "react";
import { RoomContext } from '@/context/RoomContext';

const webrtc = () => {
  const [pc, setPC] = useState<RTCPeerConnection | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [canCall, setCanCall] = useState(false);
  const [canAnswer, setCanAnswer] = useState(false);
  const { ws } = useContext(RoomContext);


  const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      }
    ],
    iceCandidatePoolSize: 10,
  }

  useEffect(() => {
    const connection = new RTCPeerConnection();
    setPC(() => connection);
  }, []);

  const handleClick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const remoteStream = new MediaStream();
    setLocalStream(() => stream)
    setRemoteStream(() => remoteStream);
    setCanCall(true);
  }

  console.log('peer connection', pc)
  console.log('local stream',localStream);
  console.log('remote stream', remoteStream);

  useEffect(() => {
    // Push tracks from local stream to peer connection
    // console.log('tracks', localStream?.getTracks())
    localStream?.getTracks().forEach(track => {
      pc?.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    if (pc) {
      pc.ontrack = event => {
        console.log('remote tracks', event)
        event.streams[0].getTracks().forEach(track => {
          remoteStream?.addTrack(track)
        })
      }
      pc.onsignalingstatechange = event => console.log('signaling state change', event);
    }
  }, [localStream, remoteStream])
  

  // NEED TO ADD A GET REQUEST FOR CALLS DOCS SOMEWHERE AND USE ID FOR THE CHATROOM OR USE CHATROOM COLLECTION
    // EACH ROOM WILL HAVE A UNIQUE ID THAT IS GRABBED PROBABLY FROM HOMEPAGE
      // MIGHT NEED TO KEEP A CONNECT BUTTON IN THE CHATROOM PAGE TO SET THE LOCAL STREAM?

  
  // ---------Calling----------
  const callClick = async () => {
    if (!canCall) return;

    const offerDescription = await pc?.createOffer();
    await pc?.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription?.sdp,
      type: offerDescription?.type,
    }

    await ws.send(JSON.stringify({ type: 'new-offer', offer }));

    if (pc) {
      pc.onicecandidate = event => {
        event.candidate &&
        // Send the ICE candidate to the remote peer
          ws.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }));
      }
    }
    setCanCall(false);
  }
  
  ws.onmessage = async (message: any) => {
    const data = JSON.parse(message.data);
    console.log('message from server', data);
    switch (data.type) {
      case 'ice-candidate':
        // console.log(data.candidate);
        if (!pc) {
          console.error('no peerconnection');
        }
        if (!data.candidate) {
          await pc?.addIceCandidate(undefined);
        } else {
          pc?.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
      case 'answers':
        // when answer received
        console.log('answer', data.answer);
        console.log('pc after answer', pc);
        if (!pc?.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc?.setRemoteDescription(answerDescription);
        }
        break;
      case 'offers':
        // when offer received
        console.log('offer', data.offers);
        console.log('pc after offer', pc);
        const offerDescription = data.offers;
        await pc?.setRemoteDescription(new RTCSessionDescription(offerDescription))
      
    }
  }

  // ---------Answering----------
  const answerClick = async () => {
    // if (!canAnswer) return;
      // on click grab the chatroom id, query DB for call doc with the id and get answerCandidates on that document
    if (pc) {
      pc.onicecandidate = event => {
        event.candidate &&
          // send answer candidates
          ws.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate, pc }));
        console.log('event candidate', event.candidate);
      }
    }
    const answerDescription = await pc?.createAnswer();
    
    if (answerDescription) {
      await pc?.setLocalDescription(answerDescription);
    }

      const answer = {
        type: answerDescription?.type,
        sdp: answerDescription?.sdp
      }

      await ws.send(JSON.stringify({ type: 'new-answer', answer }));
      
  }
    
  const handleMute = () => {
    localStream?.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled
    })
  }
  const handleCamOff = () => {
    localStream?.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled
    })
  }

  return (
    <>
      <div>
      <button className="btn" onClick={handleClick}>WEBRTC TEST</button>
      <button onClick={callClick} className='btn btn-primary m-5'>Call Button</button>
      <button onClick={answerClick} className="btn btn-accent">Answer Button</button>
      </div>

      <video id="myVideo" ref={video => {
        if(video) video.srcObject = localStream
      }} autoPlay playsInline/>
      <div>
        <button onClick={handleMute} className='btn btn-sm btn-error m-2' >Mute</button>
        <button onClick={handleCamOff} className="btn btn-sm btn-info m-2" >Turn Off Cam</button>
      </div>

      <video id="remoteVideo" ref={video => {
        if(video) video.srcObject = remoteStream
      }} autoPlay playsInline />
      
    </>
  )
}

export default webrtc;