var spreadsheetID = 'place in here';

function subtractUsedItem(foodID, sheet, sheetValues){
    /* Probably not the most efficient way of doing things, but I'm not worried */
    var i = 0;
    var keepGoing = true;
    while(i < sheetValues.length && keepGoing){
	Logger.log('checking for i: %s', i);
	if(parseInt(sheetValues[i][0]) == foodID){
	    Logger.log('it worked');
	    keepGoing = false;
	    //add 2, since i is indexed at zero, but first row is the header.
	    var cell = sheet.getRange(i + 2, 3);
	    Logger.log(cell.getValue());
	    cell.setValue(cell.getValue() - 1);
	}
	i++;
    }
}

function onFormSubmit(e) {
    var ss = SpreadsheetApp.openById(spreadsheetID);
    var inventorySheet = ss.getSheetByName('Foods');

    var formResponse = e.response;
    /* We assume the first item response is a dropdown menu, and contains the info we need */
    var response = formResponse.getItemResponses()[0];
    var foodID = parseInt(response.getResponse().split('.')[0]);
    subtractUsedItem(foodID, inventorySheet, inventorySheet.getSheetValues(2, 1, -1, -1));
}
