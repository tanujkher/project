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
                email VARCHAR(100), 
                password VARCHAR(30), 
                address VARCHAR(200),
                city VARCHAR(30),
                state VARCHAR(30),
                zip INTEGER)`,
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

exports = module.exports = {
    signup, createTable
}