const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize, DataTypes) => {
    const GraphicsCards = sequelize.define("GraphicsCards", {
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
        },
        baseClock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        boostClock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tdp: {
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
        
    });

    return GraphicsCards;
}