import { TFace, TPose, THand } from 'kalidokit'

export interface sceneBackground {
  type: 'img' | 'color' | 'colour'
  data: string
}

export interface PoseData {
  face?: TFace
  pose?: TPose
  handL?: THand<'Left'>
  handR?: THand<'Right'>
}

export interface IBackgroundAPI {
  reloadModel: () => void
  setNewModel: (data: string) => void
  setNewBackground: (data: sceneBackground) => void
  sendLandmarks: (data) => void
}

declare global {
  interface Window {
    control: IBackgroundAPI
  }
}
