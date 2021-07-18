const Sequelize = require("sequelize");
const config = require("./../configurations/config");

const Note = config.define("Note", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    header: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    details: {
        type: Sequelize.STRING,
        allowNull: false
    },
    importance: {
        type: Sequelize.ENUM,
        values: ["Not Important", "Important", "Very Important"],
        allowNull: false
    }
});

module.exports = Note;
