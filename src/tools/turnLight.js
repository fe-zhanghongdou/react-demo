export class TurnLight {
  constructor() {
    this.start()
  }

  startGreen() {
    console.log('绿灯')
  }
  startRed() {
    console.log('red灯')
  }
  startYellow() {
    console.log('yellow灯')
  }

  light = (fn, wait) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        fn();
        resolve()
      }, wait)
    })
  }

  start = () => {
    return Promise.resolve().then(() => {
      return this.light(this.startGreen, 1000)
    })
    .then(() => {
      return this.light(this.startRed, 1000)
    }).then(()=> {
      return this.light(this.startYellow, 1000)
    }).finally(() => {
      this.start();
    })
  }
}