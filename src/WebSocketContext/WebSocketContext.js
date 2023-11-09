import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LoginContext } from "../App";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const { loginID, setLoginID } = useContext(LoginContext);

  const initializeWebSocket = () => {
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
  };

  useEffect(() => {

    if (loginID) {
      initializeWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (stompClient) {
      stompClient.send("/app/user", {}, JSON.stringify(message));
    }
  };

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
