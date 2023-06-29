const server = require("./src/app.js");
const { conn } = require("./src/database");
const { seedDatabase } = require("./src/Seed/seeding.js");
const { PORT } = process.env;
require("dotenv").config();

const startServer = async () => {
  try {
    await conn.sync({ force: true });
    await seedDatabase();
    server.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
