const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 8888;
const app = express();
const endPointRoot = "/API/v1/";
const resource = "quotes/"

const connection = mysql.createConnection({
    host: "localhost",
    user: "henryliu_nodemysql",
    password: "testing",
    database: "henryliu_assign1"
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use(express.json());

app.put('*', (req, res) => {
    console.log(req.route);
    old_quote = req.body.oldQuote;
    old_author = req.body.oldAuthor;
    new_quote = req.body.newQuote;
    new_author = req.body.newAuthor;
    console.log('UPDATE quotes SET `quote`="'+ new_quote + '", `author`="' + new_author + '" ' + 'where author="' + old_author + '" AND quote="' + old_quote + '"')
    // Only update the quote
    connection.query('UPDATE quotes SET `quote`="'+ new_quote + '", `author`="' + new_author + '" ' + 'where author="' + old_author + '" AND quote="' + old_quote + '"',
    (err, result) => {
        if (err){
            throw err;
        };
        console.log(result);
    });
});

app.post('*', (req, res) => {
    console.log(req.route);
    console.log("Sending a POST request...");
    quote = req.body.quote;
    author = req.body.author;
    // TABLE `quotes`: [id, quote, author]
    connection.query('INSERT INTO quotes (quote, author) values("' + quote + '", "' + author + '")',
    (err, result) => {
        if (err){
            throw err;
        };
        console.log(result);
    });
});

// "*" means all the delete requests will be dealt here
app.delete("*", (req, res) => {
    quote = req.body.quote;
    author = req.body.author;
    console.log("Received DELETE request for...");
    console.log(req);
    console.log(quote);
    console.log(author);
    connection.query("DELETE FROM `quotes` where author='" + author + "' AND quote='" + quote + "'", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('*', (req, res) => {
    console.log(req.route);
    connection.query("SELECT * FROM quotes", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get(endPointRoot + resource + "1", (req, res) => {
    console.log(req.route);
    connection.query("SELECT * FROM quotes ORDER BY id DESC LIMIT 1", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port", PORT);
})