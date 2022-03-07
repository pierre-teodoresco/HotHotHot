let sortingState = 0;
let state = "date-down";
let ascending = false;

function addEntryToHistory(temp, needSorting) {
    let template = document.getElementById('entry-template');
    let clonedRow = document.importNode(template.content, true);

    let cells = clonedRow.querySelectorAll('td');
    cells[0].innerText = temp.val + '°C';
    cells[1].innerText = temp.sensor;
    cells[2].innerText = temp.date.toLocaleString();

    let tableBody = document.querySelector('#historic table tbody');
    tableBody.append(clonedRow);

    if (needSorting) {
        sortHistory();
    }
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

function sortHandler() {
    document.getElementById("svg-date").src = "../images/historic/caret-down.svg";

    /* SVG on temp col */
    document.getElementById("link-temp-sort").onclick = function() {
        sortingState = 1;
        if (state === "temp-up") {
            // Handle sorting
            ascending = true;
            sortHistory(ascending);

            // Handle svg
            document.getElementById("svg-temp").src = "../images/historic/caret-down.svg";
            state = "temp-down";
        } else {
            // Handle sorting
            ascending = false;
            sortHistory(ascending);

            // Handle svg
            resetSvg();
            document.getElementById("svg-temp").src = "../images/historic/caret-up.svg";
            state = "temp-up";
        }
    }

    /* SVG on sensor col */
    document.getElementById("link-sensor-sort").onclick = function() {
        sortingState = 2;
        if (state === "sensor-up") {
            // Handle sorting
            ascending = true;
            sortHistory(ascending);

            // Handle svg
            document.getElementById("svg-sensor").src = "../images/historic/caret-down.svg";
            state = "sensor-down";
        } else {
            // Handle sorting
            ascending = false;
            sortHistory(ascending);

            // Handle svg
            resetSvg();
            document.getElementById("svg-sensor").src = "../images/historic/caret-up.svg";
            state = "sensor-up";
        }
    }

    /* SVG on date col */
    document.getElementById("link-date-sort").onclick = function() {
        sortingState = 0;
        if (state === "date-up") {
            // Handle sorting
            ascending = true;
            sortHistory(ascending);

            // Handle svg
            document.getElementById("svg-date").src = "../images/historic/caret-down.svg";
            state = "date-down";
        } else {
            // Handle sorting
            ascending = false;
            sortHistory(ascending);

            // Handle svg
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
            let hour = parseInt(table[i].innerHTML.substring(12, 14));
            let min = parseInt(table[i].innerHTML.substring(15, 17));
            let sec = parseInt(table[i].innerHTML.substring(18, 20));
            // month are indexed from 0, so we need to subtract 1
            date = new Date(year, month - 1, day, hour, min, sec);
            values.push(new Temperature(val, sensor, date));
            cpt = 0;
        }
    }
    return values;
}

/* Sorting */

function sortByTemp(arr) {
    if (ascending) {
        arr.sort(function(a, b) {
            if (a.val < b.val) {
                return -1;
            } else if (a.val > b.val) {
                return 1;
            } else {
                return 0;
            }
        });
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

function sortBySensor(arr) {
    if (ascending) {
        arr.sort(function(a, b) {
            if (a.sensor === 'Intérieur' && b.sensor === 'Extérieur') {
                return -1;
            } else if (a.sensor === 'Extérieur' && b.sensor === 'Intérieur') {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        arr.sort(function(a, b) {
            if (a.sensor === 'Intérieur' && b.sensor === 'Extérieur') {
                return 1;
            } else if (a.sensor === 'Extérieur' && b.sensor === 'Intérieur') {
                return -1;
            } else {
                return 0;
            }
        });
    }
    return arr;
}

function sortByDate(arr) {
    if (ascending) {
        arr.sort(function(a, b) {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        arr.sort(function(a, b) {
            if (a.date < b.date) {
                return 1;
            } else if (a.date > b.date) {
                return -1;
            } else {
                return 0;
            }
        });
    }
    return arr;
}

function sortHistory() {
    let historic = getTempArray();
    if (sortingState === 0) {
        sortByDate(historic, ascending);
    } else if (sortingState === 1) {
        sortByTemp(historic, ascending);
    } else if (sortingState === 2) {
        sortBySensor(historic, ascending);
    }

    addAllEntryToHistory(historic);
}

/* Push into history */

function addAllEntryToHistory(arr) {
    clearHistory();
    arr.forEach(function(element) {
        addEntryToHistory(new Temperature(element.val, element.sensor, element.date), false);
    })
}

/* Graphic usign Chart.js */

function createGraph(){
    let ctx = document.getElementById("graph").getContext("2d")
    return new Chart(ctx);
}

function graphHistory(Graph){
    let TableHistory = getTempArray();
    console.log(TableHistory);

    let data = {
        labels : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
        datasets: [
            {
                label : 'Extérieur',
                backgroundColor : '#ff0000',
                data: []
            },
            {
                label: 'Intérieur',
                backgroundColor : '#0033ff',
                data: []
            }
        ]
    }
    let options = {
        scales: {
            y:
            {
                suggestedMin: -5,
                suggestedMax: 35
            }
        }
    }
    let config = {
        type: 'line',
        data : data,
        options: options
    }
    Graph.config = config;
    Graph.options = options;
    Graph.data = data;
}
