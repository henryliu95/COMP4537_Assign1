// Variables and Globals
let quoteBank = document.createElement("div");
let quotes = [];
const xhttp = new XMLHttpRequest();
const endPointRoot = "https://henryliu-cst.com/COMP_4537/assignments/assign1/read_db/API/v1/";
const resource = "quotes/";
const incompleteQuote = "Please ensure all quotes are filled out completely."


// Functions


function Button(name, colour, classAttr = null) {
    this.btn = document.createElement("button");
    this.btn.innerHTML = name;
    this.btn.style.backgroundColor = colour;
    this.btn.setAttribute("class", classAttr);
}

function displayTitle(pageTitle) {
    let title = document.createElement("h1");
    document.body.appendChild(title);
    title.innerHTML = pageTitle;
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
}

function createQuote(quote = null){
    let quoteDiv = document.createElement("div");
    quoteDiv.setAttribute("class", "quote");
    quoteBank.appendChild(quoteDiv);

    let quoteRow = document.createElement("div");
    quoteRow.setAttribute("class", "row");
    let quoteBox = document.createElement("TEXTAREA");
    quoteBox.setAttribute("placeholder", "Enter the quote");
    let authorBox = document.createElement("TEXTAREA");
    authorBox.setAttribute("placeholder", "Enter the author's name");
    quoteRow.appendChild(quoteBox);
    quoteRow.appendChild(authorBox);

    let quoteCol = document.createElement("div");
    quoteCol.setAttribute("class", "col");
    let deleteBtn = new Button ("Delete", "linen", "quoteBtn");
    let saveBtn = new Button("Save", "linen", "quoteBtn");
    if (!quote){
        saveBtn.btn.onclick = function(){
            console.log(quoteBox.value);
            console.log(authorBox.value);
            if (quoteBox.value && authorBox.value){
                post(quoteBox.value, authorBox.value)
                quote = {quote: quoteBox.value, author: authorBox.value};
                saveBtn.btn.style.display = 'none';
            }else {
                window.alert(incompleteQuote);
            }
        }
    }
    let updateBtn = new Button("Update in DB", "linen", "quoteBtn");
    deleteBtn.btn.onclick = function(){
        del(quoteBox.value, authorBox.value);
        quoteDiv.remove();
    }
    updateBtn.btn.onclick = function(){
        if (quoteBox.value && authorBox.value){
            put(quote.quote, quote.author, quoteBox.value, authorBox.value);
            quote.quote = quoteBox.value;
            quote.author = authorBox.value;
        }else {
            window.alert(incompleteQuote);
        }
    }
    quoteCol.appendChild(deleteBtn.btn);
    if (!quote){
        quoteCol.appendChild(saveBtn.btn);
    }
    quoteCol.appendChild(updateBtn.btn);
    quoteRow.appendChild(quoteCol);

    quoteDiv.appendChild(quoteRow);

    if (quote){
        console.log("There's a quote..");
        console.log(typeof(quote.quote));
        console.log(quote.quote);
        quoteBox.innerHTML = quote.quote;
        authorBox.innerHTML = quote.author;
    }
}

function displayAllQuotes(){
    storedQuotes = getAll();
    console.log("after");
    // console.log(storedQuotes);
    if (storedQuotes){
        console.log("Quotes found in DB");
        console.log(storedQuotes);
        console.log("Length is: " + storedQuotes.length);
        for (let i = 0; i < storedQuotes.length; i++){
            console.log(storedQuotes[i]);
            createQuote(storedQuotes[i]);
            quotes.push(storedQuotes[i]);
        }
    } else{
        console.log("No quotes found in DB");
        quotes = [];
    }
}

function addQuote(){
    // need to check if a quote has been written yet?
    createQuote();
    quoteBank.appendChild(document.createElement("br"));
}

function back() {
    window.location.href = "index.html";
}

function put(oldQuoteArg, oldAuthorArg, newQuoteArg, newAuthorArg){
    xhttp.open("PUT", endPointRoot + resource, true);
    let quote = {oldQuote: oldQuoteArg, oldAuthor: oldAuthorArg, newQuote: newQuoteArg, newAuthor:newAuthorArg};
    let params = JSON.stringify(quote);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(params); // Sending data
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            console.log("Successfully sent one PUT request.");
            // document.getElementById("demo").innerHTML = this.responseText;
            console.log(this.responseText);
        }
    };
}

function post(quoteArg, authorArg){
    xhttp.open("POST", endPointRoot + resource, true);
    let quote = {quote: quoteArg, author:authorArg};
    let params = JSON.stringify(quote);
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(params); // Sending data
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            console.log("Successfully sent one POST request.");
            // document.getElementById("demo").innerHTML = this.responseText;
            console.log(this.responseText);
        }
    };
}


function del(quoteArg, authorArg){
    console.log("Preparing to delete...");
    console.log(quoteArg);
    console.log(authorArg);
    let quote = {quote: quoteArg, author:authorArg};
    let params = JSON.stringify(quote);
    xhttp.open("DELETE", endPointRoot + "quotes/", true);
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(params);
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            console.log("Successfully sent one DELETE request.");
        }
    };
}

// Main


displayTitle("Admin Page");
document.body.appendChild(quoteBank);
getAll();

// Add buttons
let addButton = new Button("Add", "green");
addButton.btn.onclick = addQuote;

let backButton = new Button("Back", "grey");
backButton.btn.onclick = back;

let buttonsDiv = document.createElement("div");
buttonsDiv.appendChild(addButton.btn);
buttonsDiv.appendChild(backButton.btn);
buttonsDiv.setAttribute("class", "row");

document.body.appendChild(buttonsDiv);