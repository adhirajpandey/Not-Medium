const BASE_BACKEND_URL = "http://localhost:8000/"

async function sendQuery() {
    const inputLink = document.getElementById("input-link").value

    const payload = {
        "inputLink": inputLink
    }

    const response = await fetch(BASE_BACKEND_URL + "unmedium", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json()

    return data
}

function addToDOM(htmlData) {
    document.getElementById("output-div").innerHTML = ""
    
    const outputElem = document.createElement("div")
    outputElem.innerHTML = htmlData
    outputElem.setAttribute("class", "text-2xl text-white p-4")
    
    document.getElementById("output-div").appendChild(outputElem)
    console.log(outputElem)
}

function removeFeedbackDiv() {
    document.getElementById("feedback-div").remove()

}

function emptyOutputDiv() {
    document.getElementById("output-div").innerHTML = ""
}

function showFeedback() {
    var feedbackDiv = document.createElement("div")
    feedbackDiv.innerText = "Searching..."
    feedbackDiv.setAttribute("class", "text-2xl text-white text-center")
    feedbackDiv.setAttribute("id", "feedback-div")

    document.body.appendChild(feedbackDiv)
}

async function unmediumify() {
    showFeedback()
    emptyOutputDiv()
    const response = await sendQuery()
    addToDOM(response.html)
    removeFeedbackDiv()
}