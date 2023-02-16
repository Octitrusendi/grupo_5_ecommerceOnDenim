module.exports = (sequelize, dataTypes) => {
    let alias = 'Talles';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        talles: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'talles',
        timestamps: false
    };
    const Talles = sequelize.define(alias, cols, config)
    
    return Talles
}