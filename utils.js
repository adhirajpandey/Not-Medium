const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const baseCacheURL = "https://webcache.googleusercontent.com/search?q=cache:"

async function unmediumify(mediumURL) {
    try {
        const finalURL = `${baseCacheURL}${mediumURL}&sca_esv=5d48de1e8e0fb59b&ie=UTF-8&strip=1&vwsrc=0`

        const response = await axios.get(finalURL)
        const htmlContent = response.data

        // Parse HTML using cheerio
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
        console.error(error);
      }
    
}

module.exports = {
    unmediumify
}