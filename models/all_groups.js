module.exports = function(sequelize, DataTypes) {
    const All_groups = sequelize.define('All_groups', {
        name: DataTypes.STRING
    });
    return All_groups;
};