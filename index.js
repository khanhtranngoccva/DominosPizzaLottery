const http = require("http");
const fs = require("fs");
const path = require("path");
const views = require("./views.js");
const errors = require("./errors.js");
const contentType = require("./contentType.js");
const loadFile = require("./loadFile.js");

const publicDir = path.join(__dirname, "public");
const port = process.env.PORT || 5000;

const server = http.createServer(async (request, response) => {
    const lookupFunction = views.get(request.url);
    // Case 1: In case we have a function in the views object, we execute it.
    if (typeof lookupFunction === "function") {
        console.log("Special link requested.");
        lookupFunction(request, response);
        return;
    }
    // Case 2: If requested URL is "/", load the index.html file.
    if (request.url === "/") {
        console.log("Root directory detected.");
        loadFile.loadFile(response, path.join(publicDir, "index.html"));
    }
    // Case 3: In case we don't, look for the file. If ENOENT, return 404.
    const publicURL = path.join(publicDir, request.url);
    loadFile.loadFile(response, publicURL);
});

server.listen(port, () => {console.log(`Listening to port ${port}.`)});
