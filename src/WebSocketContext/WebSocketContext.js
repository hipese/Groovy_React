import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Stomp from 'stompjs';
import { LoginContext } from "../App";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const { loginID } = useContext(LoginContext);
  const [stompClient, setStompClient] = useState(null);

  const initializeWebSocket = useCallback(() => {
<<<<<<< HEAD
    const socket = new WebSocket('ws://10.2.1.206/ws-message');
=======
    const socket = new WebSocket('ws://192.168.0.9/ws-message');
>>>>>>> 0f09581a12f64c2ed2c03b2db55ebbbde8ddb268
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
