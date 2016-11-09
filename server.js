"use strict"

const http = require("http")
const url = require("url")
const hostname = "localhost"
const port = 9000

function start(route, handler) {
    http
        .createServer(onRequest)
        .listen(port, onStart)

    function onRequest(request, response) {
        console.log("Request for: " + request.url)
        console.log("HTTP Method: " + request.method)

        let pathname = url.parse(request.url).pathname
        let dataChunks = []

        request.setEncoding("utf8")
        
        request.addListener("data", function onReceive(dataChunk) {
            console.log("Data chunck: " + dataChunk)
            dataChunks.push(dataChunk)
        })

        request.addListener("end", function onEnd() {
            let data = dataChunks.join("")
            route(pathname, handler, response, data)
        })
    }
}

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`)
}

//Public API
exports.start = start