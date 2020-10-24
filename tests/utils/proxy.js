
const proxy = new Proxy(target, {
  get: function(target, property) {
    return target[property] || anotherFn
  }
})
