module.exports = (sequelize, dataTypes) => {
  let alias = 'Talles';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    talles: {
      type: dataTypes.STRING,
    }
  };
  let config = {
    tableName: 'talles',
    timestamps: false,
  };
  const Talles = sequelize.define(alias, cols, config);

  Talles.associate = function (models) {
    Talles.belongsToMany(models.Products, {
      as: 'talle',
      through: "productstalles",
      foreignKey: 'id_talles',
      otherKey: 'id_product',
      timestamps: false,
    });
  };
  
  return Talles;
};
