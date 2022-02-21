export interface sceneBackground {
  type: 'img' | 'color' | 'colour'
  data: string
}

export interface IBackgroundAPI {
  reloadModel: () => void
  setNewModel: (data: string) => void
  setNewBackground: (data: sceneBackground) => void
}

declare global {
  interface Window {
    control: IBackgroundAPI
  }
}
