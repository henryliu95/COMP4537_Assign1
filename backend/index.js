const adminPage = "admin.html";
const readerPage = "reader.html";

function Button(name, colour) {
    this.btn = document.createElement("button");
    this.btn.innerHTML = name;
    this.btn.style.backgroundColor = colour;
}

function goToPage(url) {
    return function() {
        window.location.href = url;
    } 
}

function displayTitle(pageTitle) {
    let title = document.createElement("h1");
    document.body.appendChild(title);
    title.innerHTML = pageTitle;
}

displayTitle("Individual Assignment - Henry Liu");

let buttonDiv = document.createElement("div");

let adminButton = new Button("Admin Page", "red");
adminButton.btn.onclick = goToPage(adminPage);

let readerButton = new Button("Reader Page", "green");
readerButton.btn.onclick = goToPage(readerPage);

buttonDiv.appendChild(adminButton.btn);
buttonDiv.appendChild(readerButton.btn);

document.body.appendChild(buttonDiv);