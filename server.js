import cors from 'cors';
import express from 'express';
import { Event, Resource, TimeRange } from "./models/index.js";

const app = express();
const port = 3000;

app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true}));

app.get("/read-resources", async (req, res) => {
  try {
    const resources = await Resource.findAll();

    // Return the expected JSON response
    res.json({
      success: true,
      data: resources,
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
    const events = await Event.findAll();

    // Return the expected JSON response
    res.json({
      success: true,
      data: events,
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
    const timeRanges = await TimeRange.findAll();

    // Return the expected JSON response
    res.json({
      success: true,
      data: timeRanges,
    });
  } catch (error) {
    console.error("Failed to fetch timeRanges:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch timeRanges",
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
