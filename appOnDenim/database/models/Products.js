module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        sale: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        id_category: {
            type: dataTypes.INTEGER,
        },
        stock: {
            type: dataTypes.INTEGER,
        },
        newCollection:{
            type: dataTypes.INTEGER,
        }
    };
    let config = {
        tableName: 'Products',
        timestamps: false,
    };
    const Products = sequelize.define(alias, cols, config)

    Products.associate = function (models) {
        Products.belongsToMany(models.Talles, {
          as: 'talle',
          through: "productstalles",
          foreignKey: 'id_product',
          otherKey: 'id_talles',
          timestamps: false,
        });
        Products.belongsTo(models.ProductCategory, {
            as: 'categoria',
            foreignKey: 'id_category'
          });
          
          Products.hasMany(models.OrderItem, {
            as: 'orderItems',
            foreignKey: 'productId'
          });
      };   
    return Products
}