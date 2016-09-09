var formID = 'put in here';

function useFoodOnSSChange(){
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
    var item = form.addListItem();

    var values = foodSheet.getSheetValues(2, 1, -1, -1);
    var choices = [];
    var foodID;
    var foodName;
    var wholeNumberItems;
    var minimumNumber;
    var needMore;
    var minimumNotReached = [];
    for(var i = 0; i < values.length; i++){
	foodID = parseInt(values[i][0]);
	foodName = values[i][1];
	wholeNumberItems = parseInt(values[i][2]);
	choices.push(item.createChoice(foodID.toString() + '. ' + foodName + ', ' + wholeNumberItems.toString()));
    }
    item.setChoices(choices);
}
