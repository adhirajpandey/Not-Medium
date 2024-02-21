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

    const data = await response.json()

    return data
}

function addToDOM(responseData) {
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
    var feedbackDiv = document.createElement("div")
    feedbackDiv.innerText = text
    feedbackDiv.setAttribute("class", "text-2xl text-white text-center")
    feedbackDiv.setAttribute("id", "feedback-div")

    document.body.appendChild(feedbackDiv)
}

async function unmediumify() {
    showFeedback("Searching...")
    emptyOutputDiv()
    const response = await sendQuery()
    if (response.status === 200) {
        addToDOM(response)
    } else {
        showFeedback("Unable to find article")
    }
    emptyFeedbackDiv()
}