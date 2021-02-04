/**
 *
 * @param  tableTitle Array类型  表头  ['姓名', '电话']
 * @param  tableData  Array类型  表数据 [{name: '1',phone: '2'}]
 * @param  fileName   导出文件的名称(带后缀格式,default: .csv)
 */
function tableToExcel ({tableTitle, tableData, fileName}) {
  tableTitle = `${tableTitle.join(',')}\n`;
  //\t 不让表格显示科学计数法或者其他格式  内容必须是String模式  Number还是会转科学计算
  for(let i = 0 ; i < tableData.length ; i++ ){
    for(let item in tableData[i]){
      tableTitle+=`${tableData[i][item] + '\t'},`;
    }
    tableTitle+='\n';
  }
  let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(tableTitle);
  var link = document.createElement("a");
  link.href = uri;
  link.download = fileName ? fileName : `${new Date().getTime()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export default tableToExcel;