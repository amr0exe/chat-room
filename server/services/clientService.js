import { state } from "../state/store.js";

export const addClient = (ws, name) => {
    state.clientNames.set(ws, name)
}

export const getClientName = (ws) => {
    return state.clientNames.get(ws)
}

export const removeClient = (ws) => {
    state.clientNames.delete(ws)
    state.clientRooms.delete(ws)
}
