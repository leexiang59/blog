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

  /**
   * 属性遍历
   * */
  for (let o in c) {
    console.log(o)
  }
  console.log('keys:', Object.keys(c))   // keys只返回可枚举自有属性
  console.log('keys:', Object.getOwnPropertyNames(c))   // getOwnPropertyNames返回所有自有属性

  /**
   * getter 和 setter
   * */
  let random = {
    title: '',
    get octet () { return Math.floor(Math.random() * 256) },
    // octet:()=>{ return Math.floor(Math.random() * 256) },
    set name (t) { this.title = t }
  }
  random.title = '343'
  console.log(random, random.octet)

  /**
   * 原型属性、类属性、可扩展性
   *
   * 原型属性：
   * 1、通过对象直接量创建的对象使用Object.prototype作为原型；
   * 2、通过new创建的对象使用构造函数的prototype属性作为原型；
   * 3、通过Object.create()创建的对象使用第一个参数（未指定时为null）作为原型。
   *
   * 类属性：
   * Object.prototype.toString.call(o).slice(8,-1)
   *
   * 可扩展性：
   * Object.esExtensible()  查看是否可扩展
   * Object.preventExtensions()   禁止扩展
   * */
  console.log(Object.getPrototypeOf(a))   // 查看对象原型
  console.log(Object.getPrototypeOf(b))
  console.log(Object.getPrototypeOf(c))
  console.log(a.isPrototypeOf(c))
  console.log(Object.prototype.isPrototypeOf(c))

  /**
   * 数组
   * */
  let arr = ['a', 3, 'name', 1, 2]
  arr.length = 6
  console.log('排序：', arr.sort())
  // 遍历
  let arr_out = ''
  for (let a of arr) {  // for...of 返回值，不可处理稀疏数组
    arr_out += `${a},`
  }
  console.log(arr_out)

  for (let a in arr) {  // for...in 返回索引，可处理稀疏数组
    arr_out += `${a},`
  }
  console.log(arr_out)

  arr.forEach(function (x) {  // 常用forEach 返回值，可处理稀疏数组，无法提前终止。
    arr_out += `${x},`
  })
  console.log(arr_out)

  for (var i = 0, len = arr.length; i < len; i++) {   // 不可处理稀疏数组，可提前终止。
    arr_out += `${arr[i]},`
  }
  console.log(arr_out)

  // 删除、插入
  arr.splice(2, 1, '33')
  console.log(arr)

  /**
   * 函数
   * */
}
