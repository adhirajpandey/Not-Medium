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

app.post("/unmediumify", async (req, resp) => {
    const mediumLink = req.body.inputLink

    if (mediumLink.length < 1) {
        resp.status(400).json({ error: "Invalid input" })
    }
    
    const articleData = await unmediumify(mediumLink)

    if (articleData.length < 500) {
        resp.status(503).json({ error: "Unable to find article" })
    }

    resp.json({
        title: articleData.title,
        html: articleData.htmlData
    })
})


app.listen(8000)
