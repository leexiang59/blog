// 测试专用
module.exports = function (req, res) {
  let a = {}
  a.x = 1
  let b = Object.create(a)
  b.y = 2
  let c = Object.create(b)
  c.z = 3
  c.x = 4
  let s = c.toString()

  console.log(c, c.x, c.y, c.z, a)
}
