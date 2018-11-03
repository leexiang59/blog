let express = require("express")
let app = express()

app.get("/", (request, response) => {
	response.send("Hello,world!")
})
app.listen(8000, () => {
	console.log("Server Start at port : 8000")
})