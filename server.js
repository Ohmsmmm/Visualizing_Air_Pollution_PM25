const express = require("express");
const app = express();
const sql = require("mssql");

// config for your database
const config = {
  user: "sa",
  password: "1234",
  server: "localhost",
  database: "GIS",
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};
const port = 3000;
Query4a(); //เลือก Query4a, Query4b, Query4c, Query4d

function Query4a() {
  sql
    .connect(config)
    .then(async () => {
      console.log("DB Connected");
      app.listen(port, () => console.log(`Starting Server on port ${port}`));
      var request = await new sql.Request();
      var command = "SELECT[country], [city], [Year], [pm25], [geom] FROM [GIS].[dbo].[WHO_AirQuality_Database_2018$] WHERE Year = '2015' AND pm25 > 50";
      var result = await request.query(command);
      console.log(result.recordset);

      const Excel = require('exceljs')
      let workbook = new Excel.Workbook()
      let worksheet = workbook.addWorksheet('test')
      worksheet.columns = [
        { header: 'country', key: 'country' },
        { header: 'city', key: 'city' },
        { header: 'Year', key: 'Year' },
        { header: 'pm25', key: 'pm25' },
        { header: 'geom', key: 'geom' }
      ]
      for (i = 0; i < result.recordset.length; i++) {
        const data = [result.recordset[i]]
        data.forEach((e, index) => {
          const rowIndex = index + i
          worksheet.addRow({
            ...e,
            amountRemaining: {
              formula: `=C${rowIndex}-D${rowIndex}`
            },
            percentRemaining: {
              formula: `=E${rowIndex}/C${rowIndex}`
            }
          })
        })
      }
      workbook.xlsx.writeFile('test.xlsx')
    })
    .catch((err) => {
      console.log(err);
    })
}

function Query4b() {
  sql
    .connect(config)
    .then(async () => {
      console.log("DB Connected");
      app.listen(port, () => console.log(`Starting Server on port ${port}`));
      var request = await new sql.Request();
      var command = "SELECT	AVG(pm25) AS pm25AVG,[country] FROM [GIS].[dbo].[WHO_AirQuality_Database_2018$] GROUP BY country ORDER BY pm25AVG DESC";
      var result = await request.query(command);
      console.log(result.recordset);

      const Excel = require('exceljs')
      let workbook = new Excel.Workbook()
      let worksheet = workbook.addWorksheet('test')
      worksheet.columns = [
        { header: 'pm25AVG', key: 'pm25AVG' },
        { header: 'country', key: 'country' }
      ]
      for (i = 0; i < result.recordset.length; i++) {
        const data = [result.recordset[i]]
        data.forEach((e, index) => {
          const rowIndex = index + i
          worksheet.addRow({
            ...e,
            amountRemaining: {
              formula: `=C${rowIndex}-D${rowIndex}`
            },
            percentRemaining: {
              formula: `=E${rowIndex}/C${rowIndex}`
            }
          })
        })
      }
      workbook.xlsx.writeFile('test.xlsx')
    })
    .catch((err) => {
      console.log(err);
    })
}

function Query4c() {
  sql
    .connect(config)
    .then(async () => {
      console.log("DB Connected");
      app.listen(port, () => console.log(`Starting Server on port ${port}`));
      var request = await new sql.Request();
      var command = "SELECT	AVG(pm25) AS pm25AVG, [Year] FROM [GIS].[dbo].[WHO_AirQuality_Database_2018$] WHERE country = 'France' GROUP BY Year ORDER BY pm25AVG DESC";
      var result = await request.query(command);
      console.log(result.recordset);

      const Excel = require('exceljs')
      let workbook = new Excel.Workbook()
      let worksheet = workbook.addWorksheet('test')
      worksheet.columns = [
        { header: 'pm25AVG', key: 'pm25AVG' },
        { header: 'Year', key: 'Year' }
      ]
      for (i = 0; i < result.recordset.length; i++) {
        const data = [result.recordset[i]]
        data.forEach((e, index) => {
          const rowIndex = index + i
          worksheet.addRow({
            ...e,
            amountRemaining: {
              formula: `=C${rowIndex}-D${rowIndex}`
            },
            percentRemaining: {
              formula: `=E${rowIndex}/C${rowIndex}`
            }
          })
        })
      }
      workbook.xlsx.writeFile('test.xlsx')
    })
    .catch((err) => {
      console.log(err);
    })
}

function Query4d() {
  sql
    .connect(config)
    .then(async () => {
      console.log("DB Connected");
      app.listen(port, () => console.log(`Starting Server on port ${port}`));
      var request = await new sql.Request();
      var command = "SELECT	SUM(population) AS affectedPopulation FROM [GIS].[dbo].[WHO_AirQuality_Database_2018$] WHERE year = '2015' AND color_pm25 = 'yellow'";
      var result = await request.query(command);
      console.log(result.recordset);

      const Excel = require('exceljs')
      let workbook = new Excel.Workbook()
      let worksheet = workbook.addWorksheet('test')
      worksheet.columns = [
        { header: 'affectedPopulation', key: 'affectedPopulation' }
      ]
      for (i = 0; i < result.recordset.length; i++) {
        const data = [result.recordset[i]]
        data.forEach((e, index) => {
          const rowIndex = index + i
          worksheet.addRow({
            ...e,
            amountRemaining: {
              formula: `=C${rowIndex}-D${rowIndex}`
            },
            percentRemaining: {
              formula: `=E${rowIndex}/C${rowIndex}`
            }
          })
        })
      }
      workbook.xlsx.writeFile('test.xlsx')
    })
    .catch((err) => {
      console.log(err);
    })
}