import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TimeRange = sequelize.define(
  "TimeRange",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: "resources",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    endDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    reccurenceRule: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: "timeRanges",
    timestamps: false,
  }
);

export default TimeRange;