const express = require("express")
const cors = require("cors")
const path = require("path")
const { unmediumify } = require("./utils");

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, "public", "index.html"))
})

app.post("/unmediumify", (req, resp) => {
    setTimeout(() => {
    resp.json({
        html: "<h1> Hello from BE " + req.body.inputLink + "</h1>" + "<p> Medium paaragraph data </p>" + "<p> Medium paaragraph data 2 </p>" 
    })
}, 2 * 1000)
})


app.listen(8000)
