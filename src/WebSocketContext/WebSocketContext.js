import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Stomp from 'stompjs';
import { LoginContext } from "../App";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const { loginID } = useContext(LoginContext);
  const [stompClient, setStompClient] = useState(null);

  const initializeWebSocket = useCallback(() => {
    const socket = new WebSocket('ws://10.2.1.195/ws-message');
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      setStompClient(client);
    });
  }, [setStompClient]);


  useEffect(() => {
    if (loginID) {
      initializeWebSocket();
    }
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
