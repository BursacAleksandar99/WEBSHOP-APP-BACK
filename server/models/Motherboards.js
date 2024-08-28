const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Motherboards = sequelize.define("Motherboards", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        memoryType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maxMemory: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        chipset: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });

    return Motherboards;
}