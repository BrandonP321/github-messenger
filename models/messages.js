module.exports = function(sequelize, DataTypes) {
    const Messages = sequelize.define('Messages', {
        message_body: DataTypes.STRING,
        // auto creates FK to users table (users_id)
        // should automatically create foreign key to all_groups table (all_groups_id)
    }, {
        underscored: true
    });
    return Messages;
};
