module.exports = function(sequelize, DataTypes) {
    const Message_recipient = sequelize.define('Message_recipient', {
        recipient_group_id: DataTypes.INTEGER,
        message_id: DataTypes.INTEGER
    });
    return Message_recipient;
};