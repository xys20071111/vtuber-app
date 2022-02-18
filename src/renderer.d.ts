export interface IBackgroundAPI {
  reloadModel: () => void
  setNewModel: (data: string) => void
}

declare global {
  interface Window {
    control: IBackgroundAPI
  }
}
