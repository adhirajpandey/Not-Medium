const BASE_BACKEND_URL = "https://not-medium.adhiraj.live/"

async function sendQuery() {
    try {
        const inputLink = document.getElementById("input-link").value

        const payload = {
            "inputLink": inputLink
        }

        const response = await fetch(BASE_BACKEND_URL + "unmediumify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        return {data: data, status: response.status}

    } catch (error) {
        console.error(error)
        showFeedback("An error occurred")
    }
}

function addArticleDataToDOM(responseData) {
    document.getElementById("output-div").innerHTML = ""

    const articleTitleElem = document.createElement("div")
    articleTitleElem.innerHTML = responseData.title
    articleTitleElem.setAttribute("class", "text-2xl text-white text-center font-bold p-4")
    
    const outputTextElem = document.createElement("div")
    outputTextElem.innerHTML = responseData.html
    outputTextElem.setAttribute("class", "text-base text-white p-4")
    
    document.getElementById("output-div").appendChild(articleTitleElem)
    document.getElementById("output-div").appendChild(outputTextElem)
}

function emptyDiv(divId) {
    document.getElementById(divId).innerHTML = ""
}

function showFeedback(text) {
    const feedbackDiv = document.getElementById("feedback-div")
    
    feedbackDiv.innerHTML = ""
    feedbackDiv.innerText = text
    feedbackDiv.setAttribute("class", "text-2xl text-white text-center")
    feedbackDiv.setAttribute("id", "feedback-div")   
}

function validateInput() {
    const inputLink = document.getElementById("input-link").value
    if (inputLink.length > 1 && inputLink.includes("medium.com")) {
        return true
    }
    return false
}


async function unmediumify() {
    emptyDiv("feedback-div")
    emptyDiv("output-div")
    
    if (!validateInput()) {
        return showFeedback("Invalid Input")
    }
    else {
        showFeedback("Searching...")
        const responseData = await sendQuery()
        const statusCode = responseData.status

        if (statusCode === 400) {
            emptyDiv("feedback-div")
            return showFeedback("Invalid Input")
        }
        if (statusCode === 503) {
            emptyDiv("feedback-div")
            return showFeedback("Unable to find article")
        }
        if (statusCode === 500) {
            emptyDiv("feedback-div")
            return showFeedback("Internal Server Error")
        }
        if (statusCode === 200) {
            emptyDiv("feedback-div")
            
            const htmlData = responseData.data
            addArticleDataToDOM(htmlData)
        }
        
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // submit on enter key press
    document.getElementById("input-link").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            document.getElementById("search-button").click()
        }
    })
    // refresh page on clicking title
    document.getElementById("title-text").addEventListener("click", function() {
        location.reload(true)
    })
})
