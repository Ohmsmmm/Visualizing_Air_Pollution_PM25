const express = require("express");
const app = express();
const sql = require("mssql");

// config for your database
const config = {
  user: "sa",
  password: "Ohmsm55343",
  server: "localhost",
  database: "GIS",
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};
const port = 3000;

sql
  .connect(config)
  .then(async () => {
    console.log("DB Connected");
    app.listen(port, () => console.log(`Starting Server on port ${port}`));
    var request = await new sql.Request();
    var command = "SELECT * FROM GIS.dbo.AirPollutionPM25";
    var result = await request.query(command);
    console.log(result.recordset[0]);
  })
  .catch((err) => {
    console.log(err);
  });