import { readFileSync } from "fs";
import sequelize from "./config/database.js";
import { Event, Resource, TimeRange } from "./models/index.js";

async function setupDatabase() {
  // Wait for all models to synchronize with the database
  await sequelize.sync();

  // Now add example data
  await addExampleData();
}

async function addExampleData() {
  try {
    // Read and parse the JSON data
    const resourcesData = JSON.parse(readFileSync("./initialData/resources.json"));
    const eventsData = JSON.parse(readFileSync("./initialData/events.json"));
    const timeRangesData = JSON.parse(
      readFileSync("./initialData/timeRanges.json")
    );

    await sequelize.transaction(async (t) => {
      const resources = await Resource.bulkCreate(resourcesData, { transaction: t });
      const events = await Event.bulkCreate(eventsData, { transaction: t });
      const timeRanges = await TimeRange.bulkCreate(timeRangesData, { transaction: t });
      return { resources, events, timeRanges }; 
    });

    console.log("Resources, events, and timeRanges added to database successfully:");
  } catch (error) {
    console.error("Failed to add data to database due to an error: ", error);
  }
}

setupDatabase();