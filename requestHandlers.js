"use strict"

const fs = require('fs')
const queryString = require('querystring')

function login(response) {
    console.log('Request handler "Login" was called')
    
    let fileName = "./index.html"
    responseHTMLFile(response, fileName)
}

function auth(response, data) {
    console.log('Request handler "Auth" was called')

    let formData = queryString.parse(data)
    let fileName = isValidUser(formData.email, formData.password) ? './success.html' : './access-denied.html'

    responseHTMLFile(response, fileName)
}

function responseHTMLFile(response, fileName) {
    fs.readFile(fileName, "utf-8", function onReturn(error, data) {
        if (error) throw error
        response.statusCode = 200
        response.setHeader("Content-Type", "text/html")
        response.write(data)
        response.end()
    })
}

function isValidUser(email, password) {
    return (email === 'edysegura@gmail.com' && password === 'littlepotato')
}

//Public API
module.exports = {
    'login': login,
    'auth': auth
}