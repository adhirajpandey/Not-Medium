const axios = require('axios')
const cheerio = require('cheerio')

const baseCacheURL = "https://webcache.googleusercontent.com/search?q=cache:"

async function unmediumify(mediumURL) {
    try {
        const finalURL = `${baseCacheURL}${mediumURL}&ie=UTF-8&strip=1&vwsrc=0`

        const response = await axios.get(finalURL)
    
        if (response.status !== 200) {
            console.log("Invalid status code")
            return {title: "", htmlData: ""}
        }

        const $ = cheerio.load(response.data)

        const title = $('title').text()

        $("*").removeAttr("class")

        const htmlData = $("#root").html()

        return {title, htmlData}

    } catch (error) {
        console.log(error)
        return {title: "", htmlData: ""}
      }
}

module.exports = {
    unmediumify
}