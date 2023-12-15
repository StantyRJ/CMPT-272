
class calendarBlock
{
    day;
    events;

    constructor(day,events)
    {
        this.day = day;
        this.events = events;
    }
}

function initCalendar(days,numDays)
{
    for(let i = 1; i <= numDays; i++)
    {
        days.push(new calendarBlock(i,[]))
    }
}

let numDays = 31;
let numCols = 7;
let currentNumCols = 0;
let currentNumRows = 0;
let currentRow = "row"
let days = [];
initCalendar(days,numDays)
function refreshCalendar()
{
    for(let i of days)
    {
        console.log(".row"+currentNumRows)
        $(".row"+currentNumRows).append("<td>"+i.day+"</td>")
        currentNumCols ++;
        if(currentNumCols >= numCols)  
        {
            currentNumRows++;
            $(".calendar").append("</br><tr class='row"+currentNumRows+"'></tr>")
            currentNumCols = 0;
        }
    }
}