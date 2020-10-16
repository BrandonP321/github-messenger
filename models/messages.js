module.exports = function(sequelize, DataTypes) {
    const Messages = sequelize.define('Messages', {
        creator_id: DataTypes.INTEGER,
        message_body: DataTypes.STRING
    });
    return Messages;
};