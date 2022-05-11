import fs from 'fs'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as WebsocketServer } from 'ws'
import { readModel3D } from './API'

const app = express()
const server = createServer(app)
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(express.static('./3d'))

const controlServer = new WebsocketServer({ server, path: '/control' })
controlServer.on('connection', (socket) => {
    if (fs.existsSync('./color.txt'))
        socket.send(JSON.stringify({ cmd: 'set-new-background', data: JSON.parse(fs.readFileSync('./background.json', { encoding: 'utf-8' })) }))
})

app.get('/api/getModel3D', readModel3D)

export { server, controlServer }
