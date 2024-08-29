const { DataTypes } = require("sequelize");
const { sequelize } = require(".");



module.exports = (sequelize, DataTypes) => {
    const Ram = sequelize.define("Ram", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        memorySize: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        memoryType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        frequency:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })

    return Ram;
}