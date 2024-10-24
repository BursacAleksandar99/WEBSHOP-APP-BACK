const { DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders', {
        userId: {
            type: DataTypes.INTEGER,
            allownull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        items: {
            type: DataTypes.STRING,
            allownull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allownull: false,
        },
    });
    return Orders;
}