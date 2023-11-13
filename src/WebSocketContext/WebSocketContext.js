import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Stomp from 'stompjs';
import { LoginContext } from "../App";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const { loginID } = useContext(LoginContext);
  const [stompClient, setStompClient] = useState(null);

  const initializeWebSocket = useCallback(() => {
<<<<<<< HEAD
    const socket = new WebSocket('ws://192.168.0.10/ws-message');
=======
    const socket = new WebSocket('ws://10.2.9.92/ws-message');
>>>>>>> 8ec81099b86f37e3a5ccd6cc1a4dbfd215760e3a
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      setStompClient(client);
    });
  }, [loginID, setStompClient]);


  useEffect(() => {
    if (loginID) {
      initializeWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [loginID]);

  return (
    <WebSocketContext.Provider value={stompClient}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export default WebSocketProvider;
