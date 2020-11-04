const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("server running on port 3000")
})