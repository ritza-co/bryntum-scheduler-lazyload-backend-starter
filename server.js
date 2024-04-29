import cors from 'cors';
import express from 'express';
import { Sequelize } from "sequelize";
import { Event, Resource, TimeRange } from "./models/index.js";

const app = express();
const port = 3000;

app.use(cors({ origin: ["http://127.0.0.1:5173","http://localhost:5173"], credentials: true }));

app.get("/read-resources", async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const count = parseInt(req.query.count) || 100;

    const resources = await Resource.findAll({
      offset: startIndex,
      limit: count,
    });

    res.json({
      success: true,
      data: resources,
      startIndex,
      count,
      total: await Resource.count(),
    });
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resources",
    });
  }
});

app.get("/read-events", async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const count = parseInt(req.query.count) || 100;
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : new Date(0);
    const endDate = req.query.endDate
      ? new Date(req.query.endDate)
      : new Date();

    // Query the database for resources to find matching resource IDs
    const resources = await Resource.findAll({
      attributes: ["id"],
      offset: startIndex,
      limit: count,
    });

    const resourceIds = resources.map((resource) => resource.id);

    // Query the database for events using filtered resource IDs and date range
    const events = await Event.findAll({
      where: {
        resourceId: {
          [Sequelize.Op.in]: resourceIds,
        },
        [Sequelize.Op.or]: [
          { startDate: { [Sequelize.Op.between]: [startDate, endDate] } },
          { endDate: { [Sequelize.Op.between]: [startDate, endDate] } },
        ],
      },
    });

    res.json({
      success: true,
      data: events,
      total: events.length,
    });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
});

app.get("/read-resourcetimeranges", async (req, res) => {
  try {
    const { query } = req;
    const startIndex = parseInt(query.startIndex) || 0;
    const count = parseInt(query.count) || 100;
    const startDate = query.startDate ? new Date(query.startDate) : new Date(0);
    const endDate = query.endDate ? new Date(query.endDate) : new Date();

    // Query the database for resources to find matching resource IDs
    const resources = await Resource.findAll({
      attributes: ["id"],
      offset: startIndex,
      limit: count,
    });
    const resourceIds = resources.map((resource) => resource.id);

    // Now fetch the time ranges for these resources that match the date constraints
    const timeRanges = await TimeRange.findAll({
      where: {
        resourceId: {
          [Sequelize.Op.in]: resourceIds,
        },
        [Sequelize.Op.or]: [
          {
            startDate: {
              [Sequelize.Op.between]: [startDate, endDate],
            },
          },
          {
            endDate: {
              [Sequelize.Op.between]: [startDate, endDate],
            },
          },
        ],
      },
    });

    res.json({
      success: true,
      data: timeRanges,
      total: timeRanges.length,
    });
  } catch (error) {
    console.error("Failed to fetch resource time ranges:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resource time ranges",
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
