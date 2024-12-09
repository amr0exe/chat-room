import { WebSocketServer } from "ws";
import http from "http"
import { handleConnection } from "./handlers/connectionHandler.js";

const server = http.createServer()
const wss = new WebSocketServer({ server })


wss.on('connection', handleConnection)
server.listen(8080, () => {
    console.log("server running on 8080:")
})
