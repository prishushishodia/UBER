import react, {createContext, use, useEffect} from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const socketProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    },[]);

    // const sendMessage = (eventName, message) => {
    //     socket.emit(eventName , message);
    // };

    // const recieveMessage = (eventName, callback) => {
    //     socket.on(eventName,callback);
    // }
    return(
        <SocketContext.Provider value={{ socket}}>
            {children}
        </SocketContext.Provider>
    )
}
export default socketProvider;
