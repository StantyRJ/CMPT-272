var highestGrade = {name: "Delmar", grade: 96.1, actualGrade: 0}
var lowestGrade = {name: "Yen", grade: 9.03, actualGrade: 100}
var lGrade = 0;
var meanGrade = "69.07"
var medianGrade = "70.54"
var total = 0;
var participants = -1;
var gradesForRefresh;

var grades = {
    Max: {percentage: 100.00, name: "Max", members: 1},
    Aplus: {percentage: 95.00, name: "A+", members: 1},
    A: {percentage: 90.00, name: "A", members: 3},
    Aminus: {percentage: 85.00, name: "A-", members: 3},
    Bplus: {percentage: 80.00, name: "B+", members: 2},
    B: {percentage: 75.00, name: "B", members: 1},
    Bminus: {percentage: 70.00, name: "B-", members: 4},
    Cplus: {percentage: 65.00, name: "C+", members: 1},
    C: {percentage: 60.00, name: "C", members: 2},
    Cminus: {percentage: 55.00, name: "C-", members: 3},
    D: {percentage: 50.00, name: "D", members: 3},
    F: {percentage: 0.00, name: "F", members: 2}
}

var allGrades = [];

for(var key in grades) {
    allGrades.push(grades[key]);
}

function refreshSite()
{
    //clear sections
    $(".stats").empty()
    $(".histogramTable").empty()
    $(".lowerBoundsTable").empty()
    $("#error").empty()

    //add all values
    for(var i = 0; i < allGrades.length; i++)
    {
        $(".lowerBoundsTable").append('<tr> <td>'+allGrades[i].name+'</td> <td><input ${} id="'+i+'" type="number" " value="'+allGrades[i].percentage.toFixed(2)+'"></td></tr>')
        if(i > 0)
        { 
            var numO = "O".repeat(allGrades[i].members);
            $(".histogramTable").append('<tr> <td>'+allGrades[i].name+'</td> <td>'+numO+'</td></tr>')
        }
    }
    $(".stats").append('<tr> <td>Highest</td> <td>'+highestGrade.name+' ('+highestGrade.grade+'%)</td></tr>')
    $(".stats").append('<tr> <td>Lowest</td> <td>'+lowestGrade.name+' ('+lowestGrade.grade+'%)</td></tr>')
    $(".stats").append('<tr> <td>Mean</td> <td>'+Math.round(meanGrade*100)/100+'</td></tr>')
    $(".stats").append('<tr> <td>Median</td> <td>'+Math.round(medianGrade*100)/100+'</td></tr>')
    $("#myFile").change(loadFile)
    let form = document.getElementById('bounds');
    form.addEventListener('input', function (event) {
        let inp = event.target;
        $("#error").empty()
        for(i in allGrades)
        {
            if(allGrades[i].percentage == parseFloat(inp.value))
            {
                inp.value = allGrades[parseInt(inp.id)].percentage
                $("#error").text("Invalid grade input grades will be crossing over!")
            }
            
        }

        inp.value = parseFloat(inp.value).toFixed(2)
        allGrades[parseInt(inp.id)].percentage = parseFloat(inp.value)
        if($("#myFile").prop('files').length > 0)
            updatePercentage()
    });
}

function updatePercentage()
{
    for(i in allGrades)
    allGrades[i].members = 0;

    //set new members
    for(g in gradesForRefresh)
    {
        for(gr in allGrades)
        {
            if(gradesForRefresh[g] >= allGrades[gr].percentage)
            {
                allGrades[gr].members ++;
                break;
            }
        }
    }

    refreshSite()
}

function loadFile(event)
{
    const reader = new FileReader();
    lowestGrade.actualGrade = 100
    highestGrade.actualGrade = 0
    reader.onload = function () 
    {
        const lines = reader.result.split('\n').map(function (line) 
        {
            participants ++
            if(participants > 0)
            {
                var elements = line.split(',')
                total += parseFloat(elements[1])

                //check highest grade
                if(parseFloat(elements[1]) > highestGrade.actualGrade)
                {
                    highestGrade.name = elements[0]
                    highestGrade.actualGrade = elements[1]
                    highestGrade.grade = elements[1]
                }
                
                //check lowest grade
                if(parseFloat(elements[1]) < lowestGrade.actualGrade)
                {
                    lowestGrade.name = elements[0]
                    lowestGrade.actualGrade = elements[1]
                    lowestGrade.grade = elements[1]
                }

                return elements[1]
            }
        })
        
        parseFloat(lines)
        lines.sort(function(a, b) {
            return a - b;
        });

        //store the grades for use later
        gradesForRefresh = lines

        meanGrade = total/participants
        medianGrade = lines[parseInt((participants-1)/2)]

        updatePercentage()
    }
    reader.readAsText(event.target.files[0])
}
