var spreadsheet_id = 'something';

function addBoughtItem(foodID, amountBought, sheet, sheetValues){
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
	    cell.setValue(cell.getValue() + amountBought);
	}
	i++;
    }
}

function onFormSubmit(e){
    Logger.log("wrote out");
    var ss = SpreadsheetApp.openById(spreadsheet_id);
    var inventorySheet = ss.getSheetByName('Foods');

    var formResponse = e.response;
    var responses = formResponse.getItemResponses();
    var item;
    var foodID;
    var amountBought;
    var numAmountBought;
    var values = inventorySheet.getSheetValues(2, 1, -1, -1);
    Logger.log(responses.length);
    for(var i = 0; i < responses.length; i++){
	item = responses[i].getItem();
	Logger.log(item);
	foodID = parseInt(item.getTitle().split('.')[0]);
	Logger.log(foodID);
	amountBought = responses[i].getResponse();
	Logger.log('amount bought');
	Logger.log(amountBought);
	if(amountBought.length > 0){

	    numAmountBought = parseInt(amountBought);
	    Logger.log('num amount bought');
	    Logger.log(numAmountBought);

	    if(!isNaN(numAmountBought)){
		Logger.log('about to add back to spreadsheet');
		addBoughtItem(foodID, numAmountBought, inventorySheet, values);
	    }
	}
    }
}
