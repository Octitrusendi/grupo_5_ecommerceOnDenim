module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductTalles';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: dataTypes.INTEGER,
        },
        id_talles: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'productstalles',
        timestamps: false
    };
    const ProductTalles = sequelize.define(alias, cols, config)

    
    ProductTalles.associate  = function (models){
        ProductTalles.hasMany(models.Talles,{
            as: 'talles',
            foreignKey:'id',
            sourceKey: 'id_talles',
            timestamps: false
        })
    }    
    return ProductTalles
}