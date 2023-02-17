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
    };
    let config = {
        tableName: 'Products',
        timestamps: false,
    };
    const Products = sequelize.define(alias, cols, config)
    
    Products.belongsToMany (models.Talles,{
        as:'talles',
        through: 'id',
        foreignKey:'idproducto',
        timestamps: false
    })

    return Products
}