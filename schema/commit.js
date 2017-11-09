module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commit', {
    id: {
      type: DataTypes.STRING(64),
      primaryKey: true,
      unique: 'compositeIndex'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    modified: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    commiterId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'commit',
    associate: {
      type: 'belongsTo',
      target: 'user',
      options: {
        foreignKey: 'commiterId',
        as: 'commiter'
      }
    }
  });
}
