module.exports = function (req, res) {
  console.log('home4')
  res.render('index', {
    title: 'Express'
  })
}
