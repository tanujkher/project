const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'myuser',
    database: 'mytestdb',
    password: 'mypass'
})

function createTable(){
    return new Promise((reject, resolve) => {
        connection.query(
            `CREATE TABLE IF NOT EXISTS ldetails (
                email VARCHAR(100) PRIMARY KEY, 
                password VARCHAR(30) NOT NULL, 
                address VARCHAR(200) NOT NULL,
                city VARCHAR(30) NOT NULL,
                state VARCHAR(30) NOT NULL,
                zip INTEGER NOT NULL)`,
                (err, result) => {
                    if(err){
                        reject(err)
                    }
                    resolve()
                } 
        )
    })
}

function signup(email, password, address, city, state, zip){
    return new Promise((resolve, reject) => {
        if(email == '' || password == '' || city == '' || state == '' || zip == ''){
            reject(err)
        }
        connection.query(
            'INSERT INTO ldetails VALUES (?, ?, ?, ?, ?, ?)',
            [email, password, address, city, state, zip],
            (err, result) => {
                if(err){
                    reject(err)
                }
                resolve()
            }
        )
    })
}

function checkUser(email, password){
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT password FROM ldetails WHERE email = ?`,
            [email],
            (err, result) => {
                if(result[0].password == password){
                    resolve()
                }else{
                    reject(err)
                }
            }
        )
    })
}

exports = module.exports = {
    signup, createTable, checkUser
}