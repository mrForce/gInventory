var formID = 'define this yourself';

function onSSChange(){
    Logger.log("changing");
    //from the URL of the spreadsheet
    var spread = SpreadsheetApp.getActiveSpreadsheet();
    var inventorySheet = spread.getSheetByName('Foods');
    var loggingLocation = spread.getSheetByName('logging');
    setupForm(spread, inventorySheet);
}
//map item ID to food ID
function setupForm(ss, foodSheet) {
    var form = FormApp.openById(formID);
    var items = form.getItems();
    for(var i = 0; i < items.length; i++){
	form.deleteItem(items[i]);
    }
    //section containing the foods we need
    var neededFoodSection = form.addSectionHeaderItem();
    neededFoodSection.setTitle('Foods you need');
    var values = foodSheet.getSheetValues(2, 1, -1, -1);
    var foodID;
    var foodName;
    var wholeNumberItems;
    var minimumNumber;
    var needMore;
    var minimumNotReached = [];
    var manuallyNeedMore = [];
    var item;
    var notNeededItems = [];
    for(var i = 0; i < values.length; i++){
	foodID = parseInt(values[i][0]);
	foodName = values[i][1];
	wholeNumberItems = parseInt(values[i][2]);
	minimumNumber = parseInt(values[i][4]);
	needMore = values[i][5];
	if(wholeNumberItems < minimumNumber){
	    item = form.addTextItem();
	    var numNeeded = minimumNumber - wholeNumberItems;
	    item.setTitle(foodID.toString() + '. ' + foodName + ', ' + wholeNumberItems.toString() + ', ' + numNeeded.toString());
	}else if(needMore == "y"){
	    item = form.addTextItem();
	    item.setTitle(foodID.toString() + '. ' + foodName);
	}else{
	    notNeededItems.push([foodID, foodName, wholeNumberItems, minimumNumber]);
	}
    }
    var notNeededFoodSection = form.addSectionHeaderItem();
    notNeededFoodSection.setTitle('Foods not needed');
    for(var i = 0; i < notNeededItems.length; i++){
	foodID = notNeededItems[i][0];
	foodName = notNeededItems[i][1];
	wholeNumberItems = notNeededItems[i][2];
	minimumNumber = notNeededItems[i][3];

	if(minimumNumber > 0){
	    item = form.addTextItem();
	    item.setTitle(foodID.toString() + '. ' + foodName + ', ' + wholeNumberItems.toString());
	}else{
	    item = form.addTextItem();
	    item.setTitle(foodID.toString() + '. ' + foodName);
	}
    }
}

