const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Processors = sequelize.define("Processors", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cores: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        threads: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        baseClock: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        boostClock: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    });

    return Processors;
}