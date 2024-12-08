// import addClient, joinRoom, leaveRoom, broadcastToRoom, getClientName
import { addClient } from "../services/clientService.js"
import { joinRoom } from "../services/roomService.js"
import { leaveRoom } from "../services/roomService.js"
import { broadcastToRoom } from "../services/messageService.js"
import { getClientName } from "../services/clientService.js"

export const handleMessage = (ws, message) => {
    try {
        const data = JSON.parse(message)

        switch (data.type) {
            case 'SET_NAME':
                addClient(ws, data.name)
                ws.send(JSON.stringify({
                    type: 'NAME_SET',
                    data: data.name
                }))
                break

            case 'JOIN_ROOM':
                joinRoom(ws, data.roomId)
                broadcastToRoom(data.roomId, {
                    type: 'SYSTEM',
                    message: `${getClientName(ws)} joined the room`
                })
                break

            case 'LEAVE_ROOM':
                leaveRoom(ws, data.roomId)
                broadcastToRoom(data.roomId, {
                    type: 'SYSTEM',
                    message: `${getClientName(ws)} left the room`
                })
                break

            case 'CHAT_MESSAGE':
                broadcastToRoom(data.roomId, {
                    type: 'CHAT_MESSAGE',
                    message: data.message
                }, ws)
                break
        }
    } catch (err) {
        console.error("Error processing message: ", err)
    }
}