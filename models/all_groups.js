module.exports = function(sequelize, DataTypes) {
    const All_groups = sequelize.define('All_groups', {
        name: DataTypes.STRING,
        group_type: DataTypes.STRING,
        repo_url: DataTypes.STRING,
    });
    return All_groups;
};