function WriteExcel(execlColum,result,name) {
    
    const Excel = require('exceljs')
    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet('test')
    worksheet.columns = execlColum

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
      workbook.xlsx.writeFile(`./output/${name}.xlsx`)

  }
  module.exports = WriteExcel