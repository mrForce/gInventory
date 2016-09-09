var emailAddresses = ['jordan.force@uconn.edu', '2038983548@messaging.sprintpcs.com'];

function sendEmail() {
    var foodName;
    var wholeNumberItems;
    var minimumNumber;
    var needMore;
    var minimumNotReached = [];
    var manuallyNeedMore = [];
    var spread = SpreadsheetApp.getActiveSpreadsheet();
    var foodSheet = spread.getSheetByName("Foods");
    var values = foodSheet.getSheetValues(2, 2, -1, -1);
    var foodName;
    var wholeNumberItems;
    var minimumNumber;
    var needMore;
    var minimumNotReached = [];
    var manuallyNeedMore = [];
    for(var i = 0; i < values.length; i++){
	foodName = values[i][0];
	wholeNumberItems = values[i][1];
	minimumNumber = values[i][3];
	needMore = values[i][4];
	if(wholeNumberItems < minimumNumber){
	    minimumNotReached.push([foodName, wholeNumberItems, minimumNumber - wholeNumberItems]);
	}else if(needMore == "y"){
	    manuallyNeedMore.push(foodName);
	}
    }
    var message = "";
    if(minimumNotReached.length == 0 && manuallyNeedMore.length == 0){
	message = "Nothing is needed. Weird";
    }else{
	if(minimumNotReached.length > 0){
	    message += "You have/need to get the following number of each item\n\n";
	    for(var i = 0; i < minimumNotReached.length; i++){
		message += minimumNotReached[i][0] + ": " + minimumNotReached[i][1].toString() +  ", " + minimumNotReached[i][2].toString() + "\n";
	    }
	}
	if(manuallyNeedMore.length > 0){
	    message += "\nYou also need to get the following items: \n";
	    for(var i = 0; i < manuallyNeedMore.length; i++){
		message += manuallyNeedMore[i] + "\n";
	    }
	}
    }
    for(var i = 0; i < emailAddresses.length; i++){
	MailApp.sendEmail(emailAddresses[i], "Food Inventory Update", message);
    }


}
