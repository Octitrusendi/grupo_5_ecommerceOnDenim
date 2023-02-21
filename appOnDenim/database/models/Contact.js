module.exports = (sequelize, dataTypes) => {
        let alias = 'Contact';
        let cols = {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: dataTypes.STRING
            },
            description: {
        
                type: dataTypes.STRING
            }
        };

        let config = {
                tableName: 'Contact',
                timestamps: true,
        }        

        const Contact = sequelize.define(alias, cols, config)
    

        return Contact
    }