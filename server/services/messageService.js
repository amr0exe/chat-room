import WebSocket from "ws";
import { state } from "../state/store.js";
import { getClientName } from "./clientService.js";

export const broadcastToRoom = (roomId, message, senderWs = null) => {
    const room = state.rooms.get(roomId) // store roomMembers in room var
    if (!room) return // if room doesn't exits, exit process

    const messageObj = {
        ...message, 
        sender: senderWs ? getClientName(senderWs) : 'System',
        timestamp: new Date().toISOString()
    }

    room.forEach(client => {    // broadcasts to all-Currently-Connected-roomMembers/clients
       if (client.readyState === WebSocket.OPEN) { // checks if the ws clients is currently connected
            const clientMessage = {
                ...messageObj,
                isSelf: client === senderWs     // adds a isSelf flag to identify SELF-SENT msg 
            }
            client.send(JSON.stringify(clientMessage))
       } 
    });
}