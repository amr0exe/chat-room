import { state } from "../state/store.js";
import { getClientName } from "./clientService.js";
import { broadcastToRoom } from "./messageService.js";

export const joinRoom = (ws, roomId) => {
    // noRoom -> createNew
    if (!state.rooms.has(roomId)) {
        state.rooms.set(roomId, new Set())
    }

    // add ws to roomOb
    state.rooms.get(roomId).add(ws)

    if (!state.clientRooms.has(ws)) {
        state.clientRooms.set(ws, new Set())
    }
    // get clients Joined rooms
    // add current room to it 
    // eg. clientRooms(ws, [('games', 'currentroom')])
    state.clientRooms.get(ws).add(roomId) 

    broadcastRoomMembers(roomId)
}

export const leaveRoom = (ws, roomId) => {
    const room = state.rooms.get(roomId)  // store roomMembers in room var
    if (room) {
        room.delete(ws) // delete ws client from the list of clients in roomsObj
        if (room.size === 0) {  // delete room that has 0 members
            state.rooms.delete(roomId)
        }
    }

    const clientRooms = state.clientRooms.get(ws) // store list of clients currently connected rooms
    if (clientRooms) {
        clientRooms.delete(roomId)  // delete the Currently-Connected(roomId) room
        if (clientRooms.size === 0) {   // if that clientRoom empty delete it
            state.clientRooms.delete(ws)
        }
    }

    broadcastRoomMembers(roomId)
}

export const getRoomMembers = (roomId) => {
    const room = state.rooms.get(roomId) // get list of members of currentRoom
    return room ? [...room].map(ws => getClientName(ws)) : [] // get list of names correspondent to clients or empty array
}

export const broadcastRoomMembers = (roomId) => {
    const room = state.rooms.get(roomId) // store roomMembers in room var
    if (!room) return // if room doesn't exits, exit process

    // spread room variable's clients into array
    // get corresponding names of ws client with getClientName
    // store it in members
    const members = [...room].map(ws => getClientName(ws)) 

    broadcastToRoom(roomId, {
        type: "ROOM_MEMBERS",
        members
    })
}