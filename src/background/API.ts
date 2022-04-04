import { Request, Response } from 'express'
import * as fs from 'fs'
import db from './database'

export function readModel3D (_req: Request, res: Response): void {
  if (fs.existsSync('./latest.vrm')) { res.send(fs.readFileSync('./latest.vrm')) } else { res.send(fs.readFileSync('./public/model.vrm')) }
}

export function setModelPath (req: Request, res: Response): void {
  const newPath = req.body.path as string
  if (newPath.indexOf('.vrm') !== -1) {
    db.set('modelPath', newPath)
    res.send({ status: 0 })
    return
  }
  res.send({ status: 1 })
}
