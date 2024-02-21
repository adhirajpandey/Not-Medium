const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const baseCacheURL = "https://webcache.googleusercontent.com/search?q=cache:"

async function unmediumify(mediumURL) {
    try {
        const finalURL = `${baseCacheURL}${mediumURL}&ie=UTF-8&strip=1&vwsrc=0`
        console.log(finalURL)
        const response = await axios.get(finalURL)
    
        if (response.status !== 200) {
            console.log("Invalid status code")
            return {title: "", htmlData: ""}
        }

        const htmlContent = response.data

        const $ = cheerio.load(htmlContent)

        // Extract title
        const title = $('title').text()

        // Fetch all tags with 'p' or 'h1' and preserve order
        const tagContent = $("p, h1").map((_, element) => {
        const tagName = $(element).prop("tagName").toLowerCase()
        return `<${tagName}>${$(element).text()}</${tagName}>\n`
        }).get().join('')

        const contentStartIndex = tagContent.indexOf("Share") + 10
        const contentEndIndex = tagContent.indexOf("medium.com") - 4

        const htmlData = tagContent.substring(contentStartIndex, contentEndIndex)

        return {title, htmlData}

    } catch (error) {
        console.log(error)
        return {title: "", htmlData: ""}
      }
}

module.exports = {
    unmediumify
}