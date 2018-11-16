
module.exports = {
  /**
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
  },
  /**
   * 封装接口方法
   * */
  apiHandle: function (req, res, handle) {
    // let req_origin = req.protocol + '://' + req.hostname
    /* res.header('Access-Control-Allow-Origin', 'http://www.willli.top')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    console.log(req.method) */

    handle(req, res)
  }
}
