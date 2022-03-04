function addEntryToHistory(temp) {
    let template = document.getElementById('entry-template');
    let clonedRow = document.importNode(template.content, true);

    let cells = clonedRow.querySelectorAll('td');
    cells[0].innerText = temp.val + '°C';
    cells[1].innerText = temp.sensor;
    cells[2].innerText = temp.date.toLocaleDateString('en-GB');

    let tableBody = document.querySelector('#historic table tbody');
    tableBody.append(clonedRow);
}

function clearHistory() {
    let row = document.querySelectorAll('td');
    for (let i = 0; i < row.length; i++) {
        if (row[i].getAttribute('class') === 'historic-title') {
            continue;
        }
        row[i].remove();
    }
}

let state = "date-down";

function sortHandler() {
    document.getElementById("svg-date").src = "../images/historic/caret-down.svg";

    /* SVG on temp col */
    document.getElementById("link-temp-sort").onclick = function() {
        if (state === "temp-up") {
            // Handle sorting
            let historic = getTempArray();
            historic = sortByTemp(historic, false);
            addAllEntryToHistory(historic);

            // Handle svg
            document.getElementById("svg-temp").src = "../images/historic/caret-down.svg";
            state = "temp-down";
        } else {
            // Handle sorting
            let historic = getTempArray();
            historic = sortByTemp(historic, true);
            addAllEntryToHistory(historic);

            // Handle svg
            resetSvg();
            document.getElementById("svg-temp").src = "../images/historic/caret-up.svg";
            state = "temp-up";
        }
    }

    /* SVG on sensor col */
    document.getElementById("link-sensor-sort").onclick = function() {
        if (state === "sensor-up") {
            document.getElementById("svg-sensor").src = "../images/historic/caret-down.svg";
            state = "sensor-down";
        } else {
            resetSvg();
            document.getElementById("svg-sensor").src = "../images/historic/caret-up.svg";
            state = "sensor-up";
        }
    }

    /* SVG on date col */
    document.getElementById("link-date-sort").onclick = function() {
        getTempArray();
        if (state === "date-up") {
            document.getElementById("svg-date").src = "../images/historic/caret-down.svg";
            state = "date-down";
        } else {
            resetSvg();
            document.getElementById("svg-date").src = "../images/historic/caret-up.svg";
            state = "date-up";
        }
    }
}

function resetSvg() {
    document.getElementById("svg-temp").src = "";
    document.getElementById("svg-sensor").src = "";
    document.getElementById("svg-date").src = "";
}

function getTempArray() {
    let values = [];
    let table = document.querySelectorAll('table tbody tr td');
    let cpt = 0;
    let val, sensor, date;

    // we start the for loop at 3 because 0, 1 and 2 are the titles
    for (let i = 3; i < table.length; ++i) {
        // Handle and convert to float temperatures
        if (cpt === 0) {
            val = table[i].innerHTML;
            if (val.length === 4) {
                val = val.substring(0, 2);
            } else if (val.length === 6) {
                val = val.substring(0, 4);
            } else {
                val = val.substring(0, 1);
            }
            val = parseFloat(val);
            ++cpt;
        }
        // Handle sensors
        else if (cpt === 1) {
            sensor = table[i].innerHTML;
            ++cpt;
        }
        // Handle date and push to values
        else if (cpt === 2) {
            let day = parseInt(table[i].innerHTML.substring(0, 2));
            let month = parseInt(table[i].innerHTML.substring(3, 5));
            let year = parseInt(table[i].innerHTML.substring(6, 10));
            // month is indexed from 0, so we need to subtract 1
            let date = new Date(year, month - 1, day);
            values.push(new Temperature(val, sensor, date));
            cpt = 0;
        }
    }
    return values;
}

/* Sorting */

function sortByTemp(arr, ascending) {
    if (ascending) {
        arr.sort(function(a, b) {
            if (a.val < b.val) {
                return -1;
            } else if (a.val > b.val) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        arr.sort(function(a, b) {
            if (a.val < b.val) {
                return 1;
            } else if (a.val > b.val) {
                return -1;
            } else {
                return 0;
            }
        });
    }
    return arr;
}

/* Push into history */

function addAllEntryToHistory(arr) {
    clearHistory();
    arr.forEach(function(element) {
        addEntryToHistory(new Temperature(element.val, element.sensor, element.date));
    })
}
