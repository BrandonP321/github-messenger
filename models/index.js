'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations

// users
db.Users.hasMany(db.Messages, {
  foreignKey: {allowNull: false}
})
db.Users.hasMany(db.User_group)

// messages
db.Messages.belongsTo(db.Users)
db.Messages.belongsTo(db.Groups, {
  foreignKey: {allowNull: false}
})

// all_groups
db.Groups.hasMany(db.User_group)
db.Groups.hasMany(db.Messages)

// user_group
db.User_group.belongsTo(db.Users)
db.User_group.belongsTo(db.Groups)


module.exports = db;
