const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Tables
db.users = require('./userModel.js')(sequelize, Sequelize)
db.posts = require('./postModel.js')(sequelize, Sequelize)
db.comments = require('./commentModel.js')(sequelize, Sequelize)

// Associations des tables User & Post
db.users.hasMany(db.posts)
db.posts.belongsTo(db.users)

// Associations des tables Comment & User ainsi que Comment & Post
db.users.hasMany(db.comments)
db.comments.belongsTo(db.users)
db.posts.hasMany(db.comments)
db.comments.belongsTo(db.posts)

module.exports = db
