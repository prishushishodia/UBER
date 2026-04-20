import React, { createContext, useRef } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    if (!socketRef.current) {
        socketRef.current = io(import.meta.env.VITE_BASE_URL);
    }

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
