// 测试专用
let util = require('../public/javascripts/util')
module.exports = function (req, res) {
  /**
   * 通过原型链创建新对象
   * */
  let a = {}
  a.x = 1
  let b = util.object_inherit(a)
  b.y = 2
  let c = Object.create(b)
  c.z = 3
  c.x = 4
  let s = c.toString()
  console.log('通过原型链创建新对象：', c, b, a)

  /**
  * 属性检测
  * in，hasOwnProperty，propertyIsEnumerable
  * */
  let _in = 'x' in c   // 包含自有属性或继承属性
  let _has = c.hasOwnProperty('toString')   // 只包含自有属性，不包含继承属性
  let _pro = c.propertyIsEnumerable('y')    // 只包含自有属性且可枚举
  console.log('属性检测：', _in, _has, _pro)
}
