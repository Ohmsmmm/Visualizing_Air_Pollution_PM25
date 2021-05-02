

function ReadExcel(params) {
  var XLSX = require('xlsx')
  var workbook = XLSX.readFile('./WHO_AnnualAirQuality_Database_2008_2017.xlsx');
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  console.log(xlData[0]);

  var result = ""
  for (i = 0, len = xlData.length; i < len; i++) {
    var values = Object.values(xlData[i]);
    result = JSON.stringify(values)
    result = result.replace("'"," ");
    // result = result.replace("L'infant","L infant");
    result = result.replace("[", "(");
    result = result.replace("]", ")"); 
    result = result.replace(/"/g, "'");
    console.log(result)
  }

  // result += ")"

  
  // console.log(slice[2])


  return result
}
module.exports = ReadExcel


// ('Spain','Vandellรฒs I L hospitalet De L'infant',2013,6.111467566,41.00944519,0.91277802,6047,'High income','Europe (HIC)','<10','green')
