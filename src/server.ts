import express from "express"
import cookieParser from "cookie-parser"
import { Server } from "socket.io"
import { createServer } from "http"

import { config } from "./config"
import { routes } from "./routes"
import { sockets } from "./sockets"

// Create Server
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
sockets(io)

// Routes
app.use(express.json())
app.use(cookieParser())
app.use("/static", express.static(config.path_public))
app.use(routes)

// Run Server
httpServer.listen(process.env.PORT ? process.env.PORT : 3000)
