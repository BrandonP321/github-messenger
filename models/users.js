module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        gitUserName: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Users;
};