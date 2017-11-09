module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commit', {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      unique: 'compositeIndex'
    },
    message: {
      type: DataTypes.STRING,
      unique: 'compositeIndex'
    },
    modified: {
      type: DataTypes.TEXT,
    },
    commiterId: {
      type: DataTypes.STRING,
    },
    ref: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
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
