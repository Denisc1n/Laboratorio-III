window.onload = loadEvents;

function loadEvents()
{
    document.getElementById("sum").addEventListener("click", sumFunction);
    document.getElementById("sumAndSave").addEventListener("click", saveToTable);
}

function sumFunction()
{
    var numberOne = parseInt(document.getElementById("valOne").value);
    var numberTwo = parseInt(document.getElementById("valTwo").value);
    var result = numberOne + numberTwo;
    console.log(result);
    document.getElementById("resultBox").value = result;
    return result;
}

function saveToTable()
{
    //var table = document.getElementById("resultTable");
    var result = sumFunction();
    //var row = table.insertRow(1);
    //var cell = row.insertCell(0);
    //var cell2 = row.insertCell(1);
    //var cell3 = row.insertCell(2);
//
    //cell.innerHTML = document.getElementById("valOne").value;
    //cell2.innerHTML = document.getElementById("valTwo").value;
    //cell3.innerHTML = result;
    //otra manera
    var tbodyObject = document.getElementById("tableBody");
    tbodyObject.innerHTML +="<tr><td>"+document.getElementById("valOne").value+"</td><td>" + 
        document.getElementById("valTwo").value+"</td><td>"+result+"</td></tr>"

}