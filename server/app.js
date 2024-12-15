import { WebSocketServer } from "ws";
import http from "http"
import { handleConnection } from "./handlers/connectionHandler.js";

const server = http.createServer()
const wss = new WebSocketServer({ server })


wss.on('connection', handleConnection)
server.listen(8070, '0.0.0.0', () => {
    console.log("server running on 8080:")
})
