const DATA_ENTRY_SHEET_NAME = "Sheet1";
const TIME_STAMP_COLUMN_NAME = "Timestamp"; 
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_ENTRY_SHEET_NAME);
const doPost = (request = {}) => {
  const { postData: { contents, type } = {} } = request;
  var data = parseFormData(contents);
  appendToGoogleSheet(data);
 return ContentService.createTextOutput(contents).setMimeType(ContentService.MimeType.JSON);
};
function parseFormData(postData) {
  var data = [];
  var parameters = postData.split('&');
  for (var i = 0; i < parameters.length; i++) {
    var keyValue = parameters[i].split('=');
    data[keyValue[0]] = decodeURIComponent(keyValue[1]);
  }
  return data;
}
function appendToGoogleSheet(data) {
  if(TIME_STAMP_COLUMN_NAME !==""){
    data[TIME_STAMP_COLUMN_NAME]=new Date();
  }
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var rowData = headers.map(headerFld => data[headerFld]);
  sheet.appendRow(rowData);
}

