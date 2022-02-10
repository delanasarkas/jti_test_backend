module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define("data", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        phone: {
            type: Sequelize.STRING
        },
        provider: {
            type: Sequelize.STRING
        },
        is_even: {
            type: Sequelize.BOOLEAN
        },
        created_by: {
            type: Sequelize.STRING
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
    });
    return Data;
};