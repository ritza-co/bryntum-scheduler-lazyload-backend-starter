import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Event = sequelize.define(
  "Event",
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
    readOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    timeZone: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    draggable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    resizable: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    children: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    allDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    duration: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    durationUnit: {
      type: DataTypes.STRING,
      defaultValue: "hour",
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    endDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    exceptionDates: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    recurrenceRule: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    cls: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    eventColor: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    eventStyle: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    iconCls: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    style: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);

export default Event;