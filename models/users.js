module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        git_user_name: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        underscored: true
    });
    return Users;
};