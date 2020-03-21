const sequelize = require('sequelize')

const db = new sequelize('mytestdb', 'myuser', 'mypass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data/Database.db'
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

const Donor = db.define('Donors', {
    name: {
        type: sequelize.STRING
    },
    donorId: {
        type: sequelize.STRING
    },
    medicalHistory: {
        type: sequelize.STRING
    },
    bloodgroup: {
        type: sequelize.STRING
    },
    lastDonation: {
        type: sequelize.DATE
    },
    gender: {
        type: sequelize.STRING
    },
    enlist: {
        type: sequelize.BOOLEAN
    }
})

Donor.belongsTo(User, {foreignKey: 'email'})
// insert into Donors (email, name, createdAt, updatedAt) values ("abc@gmail.com", "abc", "01/01/20", "02/01/20");
// this statement will not work if abc@gmail.com doesn't exist in Users table as the two tables have a 1 : 1 relation

exports = module.exports = {
    db, User, Donor
}