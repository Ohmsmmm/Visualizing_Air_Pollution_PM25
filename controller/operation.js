const sql = require("mssql");
const ReadExcel = require("../util/readExcel");
const WriteExcel = require("../util/writeExcel");
// config for your database
const config = {
    user: "sa",
    password: "1234",
    server: "localhost",
    database: "AirPollutionPM25",
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
                var command = (`SELECT * FROM AirPollutionPM25.dbo.AirPollutionPM25`)
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

                    var command = (`INSERT INTO AirPollutionPM25.dbo.AirPollutionPM25([country],[city],[Year],[pm25],[latitude],[longitude],[population],[wbinc16_text],[Region],[conc_pm25],[color_pm25]) VALUES ${data} ` )               
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
                var command = (`ALTER TABLE AirPollutionPM25.dbo.AirPollutionPM25
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
                var command = (`DELETE FROM AirPollutionPM25.dbo.AirPollutionPM25`)               
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
                // , [geom]                                                         //เปลี่ยนด้วยไอเหี้ย                                                                   
                var command = "SELECT[country], [city], [Year], [pm25] FROM AirPollutionPM25.dbo.AirPollutionPM25 WHERE Year = '2015' AND pm25 > 50";
                var result = await request.query(command);
                console.log(result)
                WriteExcel(colum,result)

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
                // , [geom]                                                       
                var command = "SELECT	AVG(pm25) AS pm25AVG,[country] FROM AirPollutionPM25.dbo.AirPollutionPM25 GROUP BY country ORDER BY pm25AVG DESC";
                var result = await request.query(command);
                console.log(result)
                WriteExcel(colum,result)

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

    async Query4C() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var colum = [
                    { header: 'pm25AVG', key: 'pm25AVG' },
                    { header: 'Year', key: 'Year' }
                  ]
                // , [geom]                                                        
                var command = "SELECT	AVG(pm25) AS pm25AVG, [Year] FROM AirPollutionPM25.dbo.AirPollutionPM25 WHERE country = 'France' GROUP BY Year ORDER BY pm25AVG DESC";                
                var result = await request.query(command);
                console.log(result)
                WriteExcel(colum,result)

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

    async Query4D() {
        return new Promise(async function (resolve, reject) {
            try {
                var request = await new sql.Request();
                var colum = [
                    { header: 'affectedPopulation', key: 'affectedPopulation' }
                  ]
                // , [geom]                                                
                var command = "SELECT	SUM(population) AS affectedPopulation FROM AirPollutionPM25.dbo.AirPollutionPM25 WHERE year = '2015' AND color_pm25 = 'yellow'";
                var result = await request.query(command);
                console.log(result)
                WriteExcel(colum,result)

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


