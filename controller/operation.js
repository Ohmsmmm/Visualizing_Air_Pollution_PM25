const sql = require("mssql");
const ReadExcel = require("../util/readExcel");
const WriteExcel = require("../util/writeExcel");
// config for your database
const config = {
    user: "sa",
    password: "1234",
    server: "localhost",
    database: "SpatialDB",
    options: {
      encrypt: false,
      enableArithAbort: true,
    },
  }



// connect to your database
var errdb = sql.connect(config)
if (errdb) {
    console.log(errdb);
}

class handle {
    async QueryAll() {
        // var functionName = 'QueryAll'
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var command = (`SELECT * FROM SpatialDB.dbo.AirPollutionPM25`)
                var result = await request.query(command);
                console.log(result)

                let message = {
                    statusCode: 200,
                    message: result
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async ImportExcel() {
        // var functionName = 'ImportExcel'
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                // var value = ReadExcel()
                // console.log(value)

                var XLSX = require('xlsx')
                var workbook = XLSX.readFile('./WHO_AnnualAirQuality_Database_2008_2017.xlsx');
                var sheet_name_list = workbook.SheetNames;
                var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                // console.log(xlData[0]);

                var data = ""
                for (let i = 0, len = xlData.length; i < len; i++) {
                    var values = Object.values(xlData[i]);
                    // var latitude = values[4]
                    // var longitude = values[5]
                    // console.log(latitude)
                    // console.log(longitude)
                    data = JSON.stringify(values)
                    data = data.replace("'", " ");
                    data = data.replace("[", "(");
                    data = data.replace("]", ")");    
                    data = data.replace(/"/g, "'");
                    data = data.replace("[", "(");
                    data = data.replace("]", ")");
                    console.log(data)

                    var command = (`INSERT INTO SpatialDB.dbo.AirPollutionPM25([country],[city],[Year],[pm25],[latitude],[longitude],[population],[wbinc16_text],[Region],[conc_pm25],[color_pm25]) VALUES ${data} ` )               
                    var result = await request.query(command);

                }


                

                // console.log(result)

                let message = {
                    statusCode: 200,
                    message: result 
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async AddGeom() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var command = (`ALTER TABLE SpatialDB.dbo.AirPollutionPM25
                ADD geom AS geography::Point(latitude , longitude,4326);`)               
                var result = await request.query(command);
                console.log(result)

                let message = {
                    statusCode: 200,
                    message: result
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async DeleteAll() {
        // var functionName = 'ImportExcel'
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var command = (`DELETE FROM SpatialDB.dbo.AirPollutionPM25`)               
                var result = await request.query(command);
                console.log(result)

                let message = {
                    statusCode: 200,
                    message: result
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query4A() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var colum = [
                    { header: 'country', key: 'country' },
                    { header: 'city', key: 'city' },
                    { header: 'Year', key: 'Year' },
                    { header: 'pm25', key: 'pm25' },
                    { header: 'geom', key: 'geom' }
                  ]
                var command = "SELECT[country], [city], [Year], [pm25],[geom] FROM SpatialDB.dbo.AirPollutionPM25 WHERE Year = '2015' AND pm25 > 50";
                var result = await request.query(command);
                console.log(result)
                WriteExcel(colum,result,"Q4a")

                console.log(result.recordset);



                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query4B() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var colum = [
                    { header: 'pm25AVG', key: 'pm25AVG' },
                    { header: 'country', key: 'country' }
                  ]
                var command = "SELECT	AVG(pm25) AS pm25AVG,[country] FROM SpatialDB.dbo.AirPollutionPM25 GROUP BY country ORDER BY pm25AVG DESC";
                var result = await request.query(command);
                console.log(result)
                WriteExcel(colum,result,"Q4B")

                console.log(result.recordset);



                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query4C(reg) {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var colum = [
                    { header: 'pm25AVG', key: 'pm25AVG' },
                    { header: 'Year', key: 'Year' }
                  ]
                  var country = reg.country
                var command = `SELECT	AVG(pm25) AS pm25AVG, [Year] FROM SpatialDB.dbo.AirPollutionPM25 WHERE country = '${country}' GROUP BY Year ORDER BY Year`;                
                var result = await request.query(command);
                console.log(result)
                WriteExcel(colum,result,"Q4C")

                console.log(result.recordset);



                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query4D(reg) {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var colum = [
                    { header: 'affectedPopulation', key: 'affectedPopulation' }
                  ]
                // , [geom]     
                var year = parseFloat(reg.year)
                var color_pm25 = reg.color_pm25                                            
                var command = `SELECT	SUM(population) AS affectedPopulation FROM SpatialDB.dbo.AirPollutionPM25 WHERE year = '${year}' AND color_pm25 = '${color_pm25}' `;
                var result = await request.query(command);
                console.log(result)
                WriteExcel(colum,result,"Q4D")

                console.log(result.recordset);



                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }


    async Query5A(reg) {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var year = reg.year
                var command = `SELECT [country], [city], [latitude], [longitude], [Year]
                FROM SpatialDB.dbo.AirPollutionPM25
                WHERE Year = '${year}' `;
                var result = await request.query(command);
                console.log(result)
                console.log(result.recordset);



                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query5B() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                
                var command = `DECLARE @Point GEOGRAPHY
                SELECT  @Point = geom
                FROM SpatialDB.dbo.AirPollutionPM25
                WHERE city = 'Bangkok'
                 
                SELECT DISTINCT TOP 50 [city], [latitude], [longitude], geom.MakeValid().STDistance(@Point) AS Distance
                From SpatialDB.dbo.AirPollutionPM25
                Order by Distance ASC `;
                var result = await request.query(command);
                console.log(result)

                console.log(result.recordset);



                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query5C() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                
                var command = `SELECT [city], [latitude], [longitude], [country], [Year]
                FROM SpatialDB.dbo.AirPollutionPM25
                WHERE  [country] in (
                    SELECT w1.NAME AS "Neighbors of Thailand" 
                    FROM [SpatialDB].[dbo].[world] w1, [SpatialDB].[dbo].[world] w2
                    WHERE w2.geom.MakeValid().STTouches(w1.geom.MakeValid())=1 and w2.NAME = 'Thailand') `;
                var result = await request.query(command);
                console.log(result)

                console.log(result.recordset);

                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query5D() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                
                var command = `SELECT MAX([longitude]) AS max_long, MAX([latitude]) AS max_lat, MIN([longitude]) AS min_long, MIN([latitude]) AS min_lat
                FROM SpatialDB.dbo.AirPollutionPM25
                WHERE [Year] = '2009' AND [country] = 'Thailand'
                GROUP BY [country], [Year] `;
                var result = await request.query(command);
                console.log(result)

                console.log(result.recordset);

                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query5E() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                
                var command = `SELECT [country], [longitude], [country], [city]
                FROM SpatialDB.dbo.AirPollutionPM25
                WHERE [country] in (
                    SELECT top 1 country
                    FROM SpatialDB.dbo.AirPollutionPM25 
                    WHERE [Year] = 2015
                    GROUP BY country
                    ORDER BY COUNT(city) DESC) `;
                var result = await request.query(command);
                console.log(result)

                console.log(result.recordset);

                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

    async Query5F(reg) {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var year = reg.year
                var command = `SELECT [latitude], [longitude], [country], [city]
                FROM SpatialDB.dbo.AirPollutionPM25
                WHERE wbinc16_text = 'Lower middle income' AND [Year] = '${year}' `;
                var result = await request.query(command);
                console.log(result)

                console.log(result.recordset);

                let message = {
                    statusCode: 200,
                    message: result.recordset
                }
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message 
                }
                reject(messageError)
            }
        })
    }

}
module.exports = handle


