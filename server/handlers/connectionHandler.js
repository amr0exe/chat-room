// import handleMessage, removeClient, leaveRoom, state
import { handleMessage } from "./messageHandler.js"
import { removeClient } from "../services/clientService.js"
import { leaveRoom } from "../services/roomService.js"
import { state } from "../state/store.js"

export const handleConnection = (ws) => {
    ws.on('message', (message) => handleMessage(ws, message))
    ws.on('close', () => handleDisconnect(ws))
}

const handleDisconnect = (ws) => {
    const clientRooms = state.clientRooms.get(ws)
    if (clientRooms) {
        [...clientRooms].forEach(roomId => {
            leaveRoom(ws, roomId)
        })
    }

    removeClient(ws)
}