let DeviceEventEmitter

try {     DeviceEventEmitter = require('react-native').DeviceEventEmitter||{addListener:()=>{remove:()=>{}}}}
catch(e){ DeviceEventEmitter =  {addListener:()=>{remove:()=>{}}}}

class KeyEvent {
  onKeyDownListener(cb) {
    this.removeKeyDownListener()
    this.listenerKeyDown = DeviceEventEmitter.addListener('onKeyDown', cb)
  }

  removeKeyDownListener() {
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove()
      this.listenerKeyDown = null;
    }
  }

  onKeyUpListener(cb) {
    this.removeKeyUpListener()
    this.listenerKeyUp = DeviceEventEmitter.addListener('onKeyUp', cb)
  }

  removeKeyUpListener() {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove()
      this.listenerKeyUp = null
    }
  }
}

export default new KeyEvent()