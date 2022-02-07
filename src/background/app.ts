import express from 'express'
import { createServer } from 'http'
import { Server as WebsocketServer } from 'ws'
import { readModel3D } from './API'

const app = express()
const server = createServer(app)
app.use(express.json())

const controlServer = new WebsocketServer({ server, path: '/control' })

app.get('/api/getModel3D', readModel3D)

export { server, controlServer }
