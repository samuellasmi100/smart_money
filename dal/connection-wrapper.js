const mysql = require("mysql2")
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.HOST, 
    user: process.env.USER, 
    password: process.env.PASSWORD, 
    database:process.env.NAME 
})

connection.connect(err => {
    if (err) {
        console.log("Failed to create connection + " + err)
        return
    }
    console.log("We're connected to MySQL")
})

 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, parameters, (err, result) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject")
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

function query(sql, parameters){
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, result) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject")
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    execute,
    executeWithParameters,
    query
}