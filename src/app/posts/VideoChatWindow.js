"use client"; // This is a client component

import React, { useEffect, useRef } from 'react';

import styles from './VideoChatWindow.module.css';

const VideoChatWindow = () => {
  const currentUserVideoRef = useRef();
  const guestUserVideoRef = useRef();

  useEffect(() => {
    const initializeWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    initializeWebcam();
  }, []);

  return (
    <div className={styles.container}>
      <div style={{backgroundColor: 'blue', height: 700, width: 700}} ref={guestUserVideoRef}>

      </div>
      <div>
        <video style={{ height: 300, width: 300}} ref={currentUserVideoRef} autoPlay muted />
      </div>
    </div>
  );
};

export default VideoChatWindow;

