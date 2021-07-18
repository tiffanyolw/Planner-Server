const Sequelize = require("sequelize");
const config = require("../configurations/config");

const Goal = config.define("Goal", {
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
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.ENUM,
        values: ["Complete", "Incomplete"],
        defaultValue: "Incomplete",
        allowNull: false
    }
});

module.exports = Goal;
