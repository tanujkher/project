const sequelize = require('sequelize')

const db = new sequelize('mytestdb', 'myuser', 'mypass', {
    host: 'localhost',
    dialect: 'mysql'
})

const User = db.define('Users', {
    email: {
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    address: {
        type: sequelize.STRING,
        allowNull: false
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    state: {
        type: sequelize.STRING,
        allowNull: false
    },
    zip: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

db.sync()
.then(() => {
    console.log('Database has been synced')
})
.catch(() => {
    console.log('Error creating database')
})

exports = module.exports = {
    User
}