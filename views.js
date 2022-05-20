const APIs = require("./api.js")

const views = new Map();
views.set("/api", APIs.flipAPI);

module.exports = views;
