const BASE_BACKEND_URL = "http://localhost:8000/"

async function sendQuery() {
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

    console.log(response.status)
    if (response.status === 400) {
        return showFeedback("Invalid Input")
    }

    if (response.status === 503) {
        return showFeedback("Unable to find article")
    }

    if (response.status === 500) {
        return showFeedback("Internal Server Error")
    }

    const data = await response.json()

    return data
}

function addArticleDataToDOM(responseData) {
    document.getElementById("output-div").innerHTML = ""

    const articleTitleElem = document.createElement("div")
    articleTitleElem.innerHTML = responseData.title
    articleTitleElem.setAttribute("class", "text-3xl text-white text-center font-bold p-4")
    
    const outputTextElem = document.createElement("div")
    outputTextElem.innerHTML = responseData.html
    outputTextElem.setAttribute("class", "text-2xl text-white p-4")
    
    document.getElementById("output-div").appendChild(articleTitleElem)
    document.getElementById("output-div").appendChild(outputTextElem)
}

function emptyFeedbackDiv() {
    document.getElementById("feedback-div").innerHTML = ""

}

function emptyOutputDiv() {
    document.getElementById("output-div").innerHTML = ""
}

function showFeedback(text) {
    const feedbackDiv = document.getElementById("feedback-div")
    
    feedbackDiv.innerHTML = ""
    feedbackDiv.innerText = text
    feedbackDiv.setAttribute("class", "text-2xl text-white text-center")
    feedbackDiv.setAttribute("id", "feedback-div")
    
}

async function unmediumify() {
    emptyFeedbackDiv()
    emptyOutputDiv()

    const responseData = await sendQuery()

    addArticleDataToDOM(responseData)
}