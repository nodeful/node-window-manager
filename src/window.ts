import { platform } from 'os'
import { WindowManager } from './window-manager'
import { Addon } from './addon'

interface Rectangle {
  x?: number
  y?: number
  width?: number
  height?: number
}

interface WindowInfo {
  id: number
  path: string
  processId: number
  title?: string
  bounds?: Rectangle
  opacity?: number
  owner?: Window
  axRef?: number
}

export class Window {
  public id: number

  public processId: number
  public path: string

  constructor (arg: number | WindowInfo) {
    if (typeof arg === 'object') {
      this.id = arg.id
      this.processId = arg.processId
      this.path = arg.path
    } else {
      this.id = arg
      const { processId, path } = this.getInfo()
      this.processId = processId
      this.path = path
    }
  }

  getBounds (): Rectangle {
    const { bounds } = this.getInfo()

    if (platform() === 'win32') {
      const sf = WindowManager.getScaleFactor(this.getMonitor())

      bounds.x = Math.floor(bounds.x / sf)
      bounds.y = Math.floor(bounds.y / sf)
      bounds.width = Math.floor(bounds.width / sf)
      bounds.height = Math.floor(bounds.height / sf)
    }

    return bounds
  }

  setBounds (bounds: Rectangle) {
    const newBounds = { ...this.getBounds(), ...bounds }

    if (platform() === 'win32') {
      const sf = WindowManager.getScaleFactor(this.getMonitor())

      newBounds.x = Math.floor(newBounds.x * sf)
      newBounds.y = Math.floor(newBounds.y * sf)
      newBounds.width = Math.floor(newBounds.width * sf)
      newBounds.height = Math.floor(newBounds.height * sf)

      Addon.setWindowBounds(this.id, newBounds)
    } else if (platform() === 'darwin') {
      Addon.setWindowBounds(this.id, newBounds)
    }
  }

  getTitle (): string {
    return this.getInfo().title
  }

  getMonitor (): number {
    return Addon.getMonitorFromWindow(this.id)
  }

  show () {
    Addon.showWindow(this.id, 'show')
  }

  hide () {
    Addon.showWindow(this.id, 'hide')
  }

  minimize () {
    if (platform() === 'win32') {
      Addon.showWindow(this.id, 'minimize')
    } else if (platform() === 'darwin') {
      Addon.setWindowMinimized(this.id, this.processId, true)
    }
  }

  restore () {
    if (platform() === 'win32') {
      Addon.showWindow(this.id, 'restore')
    } else if (platform() === 'darwin') {
      Addon.setWindowMinimized(this.id, this.processId, false)
    }
  }

  maximize () {
    Addon.showWindow(this.id, 'maximize')
  }

  bringToTop () {
    Addon.bringWindowToTop(platform() === 'darwin' ? this.processId : this.id)
  }

  redraw () {
    Addon.redrawWindow(this.id)
  }

  isWindow (): boolean {
    if (platform() === 'win32') return Addon.isWindow(this.id)
    else if (platform() === 'darwin') return !!this.getInfo()
  }

  isVisible (): boolean {
    if (platform() === 'win32') return Addon.isVisible(this.id)
  }

  toggleTransparency (toggle: boolean) {
    Addon.toggleWindowTransparency(this.id, toggle)
  }

  setOpacity (opacity: number) {
    Addon.setWindowOpacity(this.id, opacity)
  }

  getOpacity () {
    if (platform() !== 'win32') return
    return this.getInfo().opacity
  }

  setOwner (window: Window | null | number) {
    let handle = window

    if (window instanceof Window) {
      handle = window.id
    } else if (!window) {
      handle = 0
    }

    Addon.setWindowOwner(this.id, handle)
  }

  getOwner () {
    return new Window(this.getInfo().owner)
  }

  getInfo (): WindowInfo {
    return Addon.getWindowInfo(this.id)
  }
}
