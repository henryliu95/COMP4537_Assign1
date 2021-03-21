// Variables and Globals
let quoteBank = document.createElement("div");
let quotes = [];
const xhttp = new XMLHttpRequest();
const endPointRoot = "https://henryliu-cst.com/COMP_4537/assignments/assign1/read_db/API/v1/";
const resource = "quotes/";
const introString = "Below are quotes from some pretty cool people...";

// Functions
function displayTitle(pageTitle) {
    let title = document.createElement("h1");
    document.body.appendChild(title);
    title.innerHTML = pageTitle;
}

function Button(name, colour) {
    this.btn = document.createElement("button");
    this.btn.innerHTML = name;
    this.btn.style.backgroundColor = colour;
}

function getAll(){
    let get_response = null;
    xhttp.open("GET", endPointRoot + resource, true);
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send()
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            console.log("Successfully sent one GET request for all quotes.");
            get_response = JSON.parse(this.responseText);
            for (let i = 0; i < get_response.length; i++){
                createQuote(get_response[i]);
                quoteBank.appendChild(document.createElement("br"));
                quotes.push(get_response[i]);
            }

        }
    };
    getAllBtn.btn.style.display = "none";
    getOneBtn.btn.style.display = "none";
}

function createQuote(quote = null){
    let quoteDiv = document.createElement("div");
    quoteDiv.setAttribute("class", "quote");
    quoteBank.appendChild(quoteDiv);

    let quoteRow = document.createElement("div");
    quoteRow.setAttribute("class", "row");
    let quoteBox = document.createElement("TEXTAREA");
    quoteBox.setAttribute("placeholder", "Enter the quote");
    quoteBox.readOnly = true;
    let authorBox = document.createElement("TEXTAREA");
    authorBox.readOnly = true;
    authorBox.setAttribute("placeholder", "Enter the author's name");
    quoteRow.appendChild(quoteBox);
    quoteRow.appendChild(authorBox);

    let quoteCol = document.createElement("div");
    quoteCol.setAttribute("class", "col");

    quoteDiv.appendChild(quoteRow);

    if (quote){
        console.log("There's a quote..");
        console.log(typeof(quote.quote));
        console.log(quote.quote);
        quoteBox.innerHTML = quote.quote;
        authorBox.innerHTML = quote.author;
    }
}

function back() {
    window.location.href = "index.html";
}


// Main
displayTitle("Reader Page");
let intro = document.createElement("h2");
intro.innerHTML = introString;
document.body.appendChild(intro);
quoteBank.appendChild(document.createElement("br"));
let guide = document.createElement("h3")
guide.innerHTML = "quote | author";
document.body.appendChild(guide);
document.body.appendChild(quoteBank);
let getOneBtn = new Button("Get one quote", "blue");
getOneBtn.btn.onclick = function() {
    let get_response = null;
    xhttp.open("GET", endPointRoot + resource + "1", true);
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send()
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            console.log("Successfully sent one GET request for all quotes.");
            get_response = JSON.parse(this.responseText);
            createQuote(get_response[0]);
            quotes.push(get_response[0]);
        }
    };
    getAllBtn.btn.style.display = "none";
    getOneBtn.btn.style.display = "none";
}
let getAllBtn = new Button("Get all quotes", "green");
getAllBtn.btn.onclick = getAll;
// getAll();
let buttonsDiv = document.createElement("div");
buttonsDiv.appendChild(getOneBtn.btn);
buttonsDiv.appendChild(getAllBtn.btn);

let backButton = new Button("Back", "grey");
backButton.btn.onclick = back;
buttonsDiv.appendChild(backButton.btn);
document.body.appendChild(buttonsDiv);