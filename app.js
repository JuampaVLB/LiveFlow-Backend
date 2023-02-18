import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import './database.js'
import * as dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import sockets from './sockets.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

// WebSockets Settings

const server = http.createServer(app)

const io = new SocketServer(server, {
  cors: {
    origin: 'https://liveflow.vercel.app'
  }
})

sockets(io)

// Settings App

app.use(cors())
app.use(express.json())

// Routes

app.use('/api/user', userRoutes)

server.listen(PORT, () => {
  console.log('Server on PORT ' + PORT)
})
