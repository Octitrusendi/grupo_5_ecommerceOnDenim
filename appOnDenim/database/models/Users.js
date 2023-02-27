module.exports = (sequelize, dataTypes) => {
  let alias = 'Users';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: dataTypes.STRING,
    },
    fullName: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    avatar: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
    },
    id_level: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: 'Users',
    timestamps: false,
  };
  const Users = sequelize.define(alias, cols, config);

  Users.associate = models => {
    Users.Order = Users.hasMany(models.Order, {
      as: 'order',
      foreignKey: 'userId',
    });
  };
  return Users;
};
