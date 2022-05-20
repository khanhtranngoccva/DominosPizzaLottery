const errors = require("./errors.js");

/* API for the coin flip */
async function flipAPI(request, response) {
    try {
        response.writeHead(200, {
            "Content-Type": "text/json",
        });
        response.end(JSON.stringify({success: true, code: 200, result: Math.random() >= 0.5}));
    } catch (e) {
        console.error(e);
        errors.handleJSONResponseWith504(response, e);
    }
}

module.exports = {flipAPI};