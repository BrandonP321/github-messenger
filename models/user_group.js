module.exports = function(sequelize, DataTypes) {
    const User_group = sequelize.define('User_group', {
        // auto creates FK to users_id
        // FK groups_id
    }, {
        underscored: true
    });
    return User_group;
};