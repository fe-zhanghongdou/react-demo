class EventBus {
  constructor() {
    this.eventObj = {};
    this.callbackId = 0;
  }

  on(eventName, callback) {
    if (!this.eventObj(eventName)) {
      this.eventObj[eventName] = {}
    }
    const id = this.callbackId ++;
    this.eventObj[eventName][id] = callback
    return id;
  }

  emit(eventName, ...args){
    const eventListObj = this.eventObj[eventName];
    for (let id in eventListObj) {
      eventListObj[id](...args)
      if (id.indexOf('ONCE' !== -1)) {
        delete eventListObj[id]
      }
    }
  }

  off(eventName, id) {
    delete this.eventObj[eventName][id]
    if (Object.keys(this.eventObj[eventName]).length === 0) {
      delete this.eventObj[eventName]
    }
  }

  once(eventName, callback) {
    if (!this.eventObj(eventName)) {
      this.eventObj[eventName] = {}
    }
    const id = this.callbackId ++;
    this.eventObj[eventName]['ONCE' + id] = callback
    return id
  }
}