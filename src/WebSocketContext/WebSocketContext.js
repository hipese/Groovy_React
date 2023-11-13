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
    const socket = new WebSocket('ws://10.2.9.92/ws-message');
>>>>>>> c554d9bd8bc89376e24f126b9c2dc1d0dfb913eb
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
