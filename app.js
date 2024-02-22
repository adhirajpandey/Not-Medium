const express = require("express")
const cors = require("cors")
const path = require("path")
const { unmediumify } = require("./utils")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, "public", "index.html"))
})

app.post("/unmediumify", async (req, resp) => {
    const mediumLink = req.body.inputLink

    if (!mediumLink || mediumLink.length < 1 || !mediumLink.includes("medium.com")) {
        return resp.status(400).json({ error: "Invalid input"})
    }

    try {
        const articleData = await unmediumify(mediumLink)

        if (articleData.htmlData.length < 200) {
            return resp.status(503).json({ error: "Unable to find article" })
        } else {
            resp.json({
                title: articleData.title,
                html: articleData.htmlData
            })
        }
    } catch (error) {
        console.error("Error processing request:", error)
        resp.status(500).json({ error: "Internal Server Error" })
    }

})


app.listen(8000)
