"use strict"

const fs = require('fs')
const queryString = require('querystring')

function login(response) {
    console.log('Request handler "Page 1" was called')

    fs.readFile("./index.html", "utf-8", function onReturn(error, data) {
        if (error) throw error
        response.statusCode = 200
        response.setHeader("Content-Type", "text/html")
        response.write(data)
        response.end()
    })
}

function auth(response, data) {
    console.log('Request handler "Page 2" was called')
    response.statusCode = 200
    response.setHeader("Content-Type", "text/json")
    response.write(JSON.stringify(queryString.parse(data)))
    response.end()
}

//Public API
module.exports = {
    'login': login,
    'auth': auth
}