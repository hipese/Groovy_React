import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LoginContext } from "../App";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const { loginID } = useContext(LoginContext);
  const [stompClient, setStompClient] = useState(null);

  const initializeWebSocket = useCallback(() => {
    const socket = new SockJS('/ws-message');
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      client.subscribe('/topic/' + loginID, (response) => {
        console.log(response);
        console.log(JSON.parse(response.body));
      });

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
