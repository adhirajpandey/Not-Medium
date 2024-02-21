const express = require("express")
const cors = require("cors")
const { test } = require("./utils");

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + "/public"));


app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/public/index.html")
})

app.get("/test", (req, resp) => {
    const a = test()
    resp.json(a)
})


app.post("/unmedium", (req, resp) => {
    setTimeout(() => {
    resp.json({
        html: "<h1> Hello from BE " + req.body.inputLink + "</h1>" + "<p> Medium paaragraph data </p>" + "<p> Medium paaragraph data 2 </p>" 
    })
}, 2 * 1000)
})


app.listen(8000)
