module.exports = function(sequelize, DataTypes) {
    const Groups = sequelize.define('Groups', {
        group_name: DataTypes.STRING,
        group_type: DataTypes.STRING,
        repo_url: DataTypes.STRING,
    }, {
        underscored: true
    });
    return Groups;
};