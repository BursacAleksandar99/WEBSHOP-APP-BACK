const { DataTypes } = require("sequelize");
const { sequelize } = require(".");



module.exports = (sequelize, DataTypes) => {
    const Ssd = sequelize.define("Ssd", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        interface:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        memorySize: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        writingSpeed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        readingSpeed:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Ssd;
}