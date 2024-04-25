import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Resource = sequelize.define(
  "Resource",
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
    city: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    eventColor: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    iconCls: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    image: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "resources",
    timestamps: false,
  }
);

export default Resource;