import { WindowManager } from '../src'

;(async () => {

  const window = WindowManager.getActiveWindow()
  console.log(WindowManager.getWindows())
  console.log(window.getTitle())
  console.log(window.getBounds())
  window.setBounds({ x: 0, y: 0 })
  debugger
})()
