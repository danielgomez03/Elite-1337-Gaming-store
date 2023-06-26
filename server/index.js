const server = require('./src/app.js');
const { conn } = require('./src/database');
const { seedDatabase } = require('./src/Seed/seeding.js');
const { PORT } = process.env;
require('dotenv').config();

conn.sync({ force: true }).then(() => {
  seedDatabase();
  server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
