const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8080;

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);

const requestListener = function (req, res) {
    console.log(req.url);
    let indexFile;
    switch (req.url) {
        case "/":
            fs.readFile(__dirname + "/index.html")
                .then(contents => {
                    indexFile = contents;
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(indexFile);
                })
                .catch(err => {
                    console.error(`Could not read index.html file: ${err}`);
                    process.exit(1);
                });
            break

        case "/index":
            fs.readFile(__dirname + "/index.html")
                .then(contents => {
                    indexFile = contents;
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(indexFile);
                })
                .catch(err => {
                    console.error(`Could not read index.html file: ${err}`);
                    process.exit(1);
                });
            break

        case "/json/books":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(books);
            break

        case "/json/authors":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(authors);
            break

        case `/json`:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "No JSON file found" }));
            break

        case `/json/`:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "No JSON file found" }));
            break

        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "No web page found" }));
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});