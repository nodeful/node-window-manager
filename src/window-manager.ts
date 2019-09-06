import { EventEmitter } from 'events'
import { Addon } from './addon'
import { Window } from './window'
import { release } from 'os'

export class WindowManager extends EventEmitter {
  // constructor () {
  //   super()

  //   let lastId: number

  //   this.on('newListener', event => {
  //     if (registeredEvents.indexOf(event) !== -1) return

  //     if (event === 'window-activated') {
  //       interval = setInterval(async () => {
  //         const win = Addon.getActiveWindow()

  //         if (lastId !== win.id) {
  //           lastId = win.id
  //           this.emit('window-activated', new Window(win))
  //         }
  //       }, 50)
  //     } else {
  //       return
  //     }

  //     registeredEvents.push(event)
  //   })

  //   this.on('removeListener', event => {
  //     if (this.listenerCount(event) > 0) return

  //     if (event === 'window-activated') {
  //       clearInterval(interval)
  //     }

  //     registeredEvents = registeredEvents.filter(x => x !== event)
  //   })
  // }

  static getActiveWindow = () => {
    return new Window(Addon.getActiveWindow())
  }

  static getScaleFactor = (monitor: number) => {

    const numbers = release()
      .split('.')
      .map(d => parseInt(d, 10))

    if (numbers[0] > 8 || (numbers[0] === 8 && numbers[1] >= 1)) {
      return Addon.getMonitorScaleFactor(monitor)
    }

    return 1
  }

  static getWindows (): Window[] {
    return Addon.getWindows().map((win: any) => new Window(win))
  }
}
