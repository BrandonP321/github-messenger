module.exports = function(sequelize, DataTypes) {
    const User_group = sequelize.define('User_group', {
        user_id: DataTypes.INTEGER,
        group_id: DataTypes.INTEGER
    });
    return User_group;
};