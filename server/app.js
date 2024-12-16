import express from "express"
import { WebSocketServer } from "ws"
import { handleConnection } from "./handlers/connectionHandler.js"

const app = express()

const server = app.listen(8080, "0.0.0.0", () => {
    console.log("Server running on port 8080")
});

const wss = new WebSocketServer({ server })

wss.on("connection", handleConnection)

app.get("/", (req, res) => {
    res.send("WebSocket server is running!")
})
