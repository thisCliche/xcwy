class EventEmitter {
  constructor() {
    this.cache = {} // 初始化事件对象
  }
  on(name, fn) {
    if (typeof fn == 'function') {
      if (this.cache[name]) {
        this.cache[name].push(fn)
      } else {
        this.cache[name] = [fn]
      }
    }
  }
  off(name) {
    if (this.cache[name]) {
      delete this.cache[name]
    }
  }
  emit(name, ...agr) {
    if (this.cache[name]) {
      for (let fn of this.cache[name]) {
        fn(...agr)
      }
    }
  }
}
let eventBus = new EventEmitter()
export default eventBus