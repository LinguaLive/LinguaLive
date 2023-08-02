'use client';

import { useEffect, useState } from "react";
import { Calls } from '../../models/Calls';


const webrtc = () => {
  const [pc, setPC] = useState<RTCPeerConnection | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      }
    ],
    iceCandidatePoolSize: 10,
  }

  useEffect(() => {
    const connection = new RTCPeerConnection(servers);
    setPC(() => connection);
  }, []);

  const handleClick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const remoteStream = new MediaStream();
    setLocalStream(() => stream)
    setRemoteStream(() => remoteStream);
  }

  console.log('peer connection', pc)
  console.log('local stream',localStream);
  console.log('remote stream', remoteStream);

  useEffect(() => {
    // Push tracks from local stream to peer connection
    console.log('tracks', localStream?.getTracks())
    localStream?.getTracks().forEach(track => {
      pc?.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    if (pc) {
      pc.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
          remoteStream?.addTrack(track)
        })
      }
    }
  }, [remoteStream])
  

  // NEED TO ADD A GET REQUEST FOR CALLS DOCS SOMEWHERE AND USE ID FOR THE CHATROOM OR USE CHATROOM COLLECTION
    // EACH ROOM WILL HAVE A UNIQUE ID THAT IS GRABBED PROBABLY FROM HOMEPAGE
      // MIGHT NEED TO KEEP A CONNECT BUTTON IN THE CHATROOM PAGE TO SET THE LOCAL STREAM?


  // ---------Calling----------
  const callClick = async () => {
    if (pc) {
      pc.onicecandidate = event => {
        event.candidate
        // Need to add a post request to save to offercandidates collection?
      }
    }

    const offerDescription = await pc?.createOffer();
    await pc?.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription?.sdp,
      type: offerDescription?.type,
    }
    const data = await fetch('/api/offers', {
      method: 'POST',
      body: JSON.stringify(offer)
    });
    const res = await data.json();

    // -------Event listener for change on Calls collection-------
      // ******CAN'T PUT THIS HERE******
    // Calls.watch().on('change', data => {
    //   const { documentKey } = data;

    //   // this isn't exactly right, need to see what the data looks like. Need to check for new answer on the new / updated Call document?
    //   if (!pc?.currentRemoteDescription && data?.answer) {
    //     const answerDescription = new RTCSessionDescription(data.answer);
    //     pc?.setRemoteDescription(answerDescription);
    //   }

    //   // Use documentKey from updated document to query for associated answer documents
    //   fetch('/api/calls', {
    //     method: 'POST',
    //     body: JSON.stringify(documentKey.id)
    //   })
    //     .then(res => data.json())
    //     .then(data => {
    //       // Probably need to destructure the data to get the right info
    //       data.answerCandidates.forEach((candidate: RTCIceCandidateInit | undefined) => {
    //         const answerCandidate = new RTCIceCandidate(candidate);
    //         pc?.addIceCandidate(answerCandidate);
    //       })
    //     })
    // });
  }


  // ---------Answering----------
  const answerClick = async () => {
      // on click grab the chatroom id, query DB for call doc with the id and get answerCandidates on that document
    if (pc) {
      pc.onicecandidate = event => {
        event.candidate && console.log(event.candidate)
          // add to answerCandidates on the chatroom/call document
      }
      
      // fetch offer data
      // offerDescription = offer
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp
      }
      const data = await fetch('/api/answers', {
        method: 'POST',
        body: JSON.stringify(answer)
      });
      const res = await data.json();


      // -----Listen for updates on offerCandidates----
        // Need to somehow listen for updates on the offerCandidates
        // iterate through and pc.addIceCandidate(new RTCIceCandidate(data))
      
    }
  }
    

  return (
    <>
      <div>webrtc</div>
      <button className="btn" onClick={handleClick}>WEBRTC TEST</button>
      <button onClick={callClick} className='btn btn-primary m-5'>Call Button</button>
      <button onClick={answerClick} className="btn btn-accent m-5">Answer Button</button>
      <input type="text" className="input-success" />

      <video id="myVideo" ref={video => {
        if(video) video.srcObject = localStream
      }} autoPlay playsInline/>

      <video id="remoteVideo" ref={video => {
        if(video) video.srcObject = remoteStream
      }} autoPlay playsInline/>
    </>
  )
}

export default webrtc;