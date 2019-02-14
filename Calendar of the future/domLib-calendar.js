function myCalendar(currentMonth = "crn") {
    var htmlBody = "";
    var classTd = "";
    var weekCounter = 1;
    var trCounter = 1;
    var tdCounter = 1;
    var offsetTd = 0;
    var counter = 1;

    var daysOfMonth = [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   // var startOfcurrentMonth = new Date(year + "-" + Number(month+1) + "-01").getDay();
    var month = controllerObj.months[currentMonth];
    var startOfcurrentMonth =  new Date(year + "-" + Number(month+1) + "-01").getDay();
    if(currentMonth!=="crn"){

        if(controllerObj.months[currentMonth]===11 && currentMonth==="prev"){
            year--;
        }
        if(controllerObj.months[currentMonth]===0 && currentMonth==="next"){
            year++;
        }

    }

    domLib.changeTextContent('month_year', allMonths[month] + " " + year);
    // Displays the current month in Strings and the actual year

    /// $('.month-year').html("<h3>"+months_full[month]+" "+year+"</h3>");

    //To build the calendar body
    while (counter <= daysOfMonth[month]) {
        if (weekCounter === 8) {
            htmlBody += "</tr>";
            weekCounter = 1;
        }
        if (weekCounter === 1) {
            htmlBody += "<tr>";
            trCounter++;
        }
        // prepend blank tds
        while (offsetTd < startOfcurrentMonth) {
            htmlBody += "<td class='empty'></td>";
            offsetTd++;
            weekCounter++;
            tdCounter++;
        }
        if (month === d.getUTCMonth() && year === d.getUTCFullYear()) {
            if (counter === date) {
                classTd = "success";
            } else {
                classTd = "currentMonth";
            }
        }
        htmlBody += "<td  class='" + classTd + "'>" + counter + "</td>";
        counter++;
        weekCounter++;
        tdCounter++;
    }
    // append blank tds
    // while ((tdCounter - 1) < (trCounter - 1) * 7) {
    //     htmlBody += "<td class='empty'></td>";
    //     tdCounter++;
    // }
    domLib.setHtmlContent('calendar_tbody', htmlBody);            //addElement('tr', htmlBody, 'calendar_tbody');
    //setting controllerObj.months
    controllerObj.months.crn = month;
    controllerObj.months.prev = month === 0 ? 11 : month - 1;
    controllerObj.months.next = month === 11 ? 0 : month + 1;

    controllerObj.day_start.crn = startOfcurrentMonth;
    var temp_prev_som = startOfcurrentMonth - daysOfMonth[controllerObj.months.prev]%7;
    if(temp_prev_som < 0){
        temp_prev_som = 7 + temp_prev_som;
    }
    controllerObj.day_start.prev = temp_prev_som;
    controllerObj.day_start.next = weekCounter === 8 ? 0 : weekCounter-1;
}

var d = new Date();
var year = d.getUTCFullYear();
var day = d.getUTCDay();
var date = d.getUTCDate();
var month = d.getUTCMonth();




var controllerObj = {
    day_start: {
        prev: 0, crn: 0 , next: 0
    },
    months: {
        prev: this.month-1, crn: this.month, next: this.month+1
    }
};





//Getting February Days Including The Leap Year
if ((this.year % 100!=0) && (this.year% 4==0) || (this.year%400 == 0 )) {
    var febDays = 29;
} else {
    var febDays = 28;
}

//domLib.createEvent(document, 'ready', () => {
    console.clear();
    var d = new Date();
    myCalendar();
    var main_obj = controllerObj;

     domLib.createEvent('prev_month', 'click', function(){
        return myCalendar("prev");
     });
    domLib.createEvent('next_month', 'click', function(){
       return myCalendar("next");
    });

