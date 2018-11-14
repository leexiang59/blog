
module.exports = {
  /*
  * 通过原型链创建一个新对象
  * 修改新对象的值时，不会影响其继承对象的值。
  * */
  object_inherit: function (obj) {
    if (obj === null) throw TypeError()
    if (Object.create) return Object.create(obj)
    var t = typeof obj
    if (t !== 'object' && t !== 'function') throw TypeError()
    function F () {}
    F.prototype = obj
    return new F()
  }
}
