"use client"; // This is a client component

import React, { useEffect, useRef } from 'react';
import Peer from 'simple-peer';

import Webcam from 'react-webcam';



const VideoChat = ({ isRemote }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  let peer = null;

  useEffect(() => {
    if (isRemote) {
      // Simulate a remote peer by initializing a new Peer with a different initiator value
      peer = new Peer({ initiator: false, trickle: false });

      // Replace the following line with the received signal from the remote peer
      const receivedSignalData = ''; // Received signal data

      peer.signal(receivedSignalData);
    } else {
      // Initialize local peer
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          localVideoRef.current.srcObject = stream;
          peer = new Peer({ initiator: true, stream: stream });

          peer.on('signal', data => {
            // Send the signal data to the remote peer
            // This data needs to be passed to the remote peer somehow (e.g., using a signaling server)
            // Once the remote peer receives this signal, it can set the received signal using `peer.signal(receivedSignalData)`
          });

          peer.on('stream', remoteStream => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        })
        .catch(error => {
          console.error('Error accessing local media:', error);
        });
    }

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [isRemote]);

  return (
    <div>
      {isRemote ? (
        <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '100vh' }}></video>
      ) : (
        <video ref={localVideoRef} autoPlay muted style={{ width: '200px', height: '150px', position: 'absolute', top: '10px', left: '10px' }}></video>
      )}
    </div>
  );
};


/*
const VideoChat = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  let peer = null;

  useEffect(() => {
    // Initialize local peer
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideoRef.current.srcObject = stream;
        peer = new Peer({ initiator: true, stream: stream });

        peer.on('signal', data => {
          // Send the signal data to the remote peer
          // This data needs to be passed to the remote peer somehow (e.g., using a signaling server)
          // Once the remote peer receives this signal, it can set the received signal using `peer.signal(receivedSignalData)`
        });

        peer.on('stream', remoteStream => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      })
      .catch(error => {
        console.error('Error accessing local media:', error);
      });

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted style={{ width: '200px', height: '150px', position: 'absolute', top: '10px', left: '10px' }}></video>
      <video ref={remoteVideoRef} autoPlay style={{ width: '100%', height: '100vh' }}></video>
    </div>
  );
};
*/

export default VideoChat;
