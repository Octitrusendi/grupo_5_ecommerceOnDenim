module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'categories',
        timestamps: false,
    };
    const ProductCategory = sequelize.define(alias, cols, config)
    ProductCategory.associate = function (models) {
        ProductCategory.hasMany(models.Products, {
            as: 'productos',
            foreignKey: 'id_category',
          });
      };   

    return ProductCategory
}