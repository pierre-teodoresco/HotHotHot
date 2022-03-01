function addEntryToHistory(temp) {
    let template = document.getElementById('entry-template');
    let clonedRow = document.importNode(template.content, true);

    let cells = clonedRow.querySelectorAll('td');
    cells[0].innerText = temp.val + '°C';
    cells[1].innerText = temp.sensor;
    cells[2].innerText = temp.date.toLocaleString();

    let tableBody = document.querySelector('#historic table tbody');
    tableBody.append(clonedRow);
}

let state = "date-up";

function sortHandler() {
    document.getElementById("svg-date").src = "../images/historic/caret-up.svg";

    document.getElementById("link-date-sort").onclick = function() {
        if (state === "date-up") {
            document.getElementById("svg-date").src = "../images/historic/caret-down.svg";
            state = "date-down";
            sortTempArrayByDate(getTempArray(), true);
        } else {
            resetSvg();
            document.getElementById("svg-date").src = "../images/historic/caret-up.svg";
            state = "date-up";
            sortTempArrayByDate(getTempArray(), false);
            console.log(getTempArray());
        }
    }
    document.getElementById("link-lieu-sort").onclick = function() {
        if (state === "sensor-up") {
            document.getElementById("svg-sensor").src = "../images/historic/caret-down.svg";
            state = "sensor-down";
            sortTempArrayBySensor(getTempArray(), true);
        } else {
            resetSvg();
            document.getElementById("svg-sensor").src = "../images/historic/caret-up.svg";
            state = "sensor-up";
            sortTempArrayBySensor(getTempArray(), false);
            console.log(getTempArray());
        }
    }
    document.getElementById("link-temp-sort").onclick = function() {
        if (state === "temp-up") {
            document.getElementById("svg-temp").src = "../images/historic/caret-down.svg";
            state = "temp-down";
            sortTempArrayByTemp(getTempArray(), true);
        } else {
            resetSvg();
            document.getElementById("svg-temp").src = "../images/historic/caret-up.svg";
            state = "temp-up";
            sortTempArrayByTemp(getTempArray(), false);
            console.log(getTempArray());
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
    for (let i = 3; i < table.length; ++i) {
        if (cpt === 0) {
            val = table[i].innerHTML;
            if (val.length === 4) {
                val = val.substring(0, 2);
            } else {
                val = val.substring(0, 4);
            }
            val = parseFloat(val);
            ++cpt;
        } else if (cpt === 1) {
            sensor = table[i].innerHTML;
        } else if (cpt === 2) {
            date = new Date(table[i].innerHTML);
        } else {
            values.push(new Temperature(val, sensor, date));
            cpt = 0;
        }
    }
    console.log(values);
    return values;
}

function swap(a, b) {
    let c = a;
    a = b;
    b = c;
}

function sortTempArrayByTemp(tempArray, ascending) {
    if (ascending) {
        for (let i = 0; i < tempArray.length; ++i) {
            if (tempArray[i].val > tempArray[i + 1].val) {
                swap(tempArray[i].val, tempArray[i + 1].val)
            }
        }
    } else {
        for (let i = 0; i < tempArray.length; ++i) {
            if (tempArray[i].val < tempArray[i + 1].val) {
                swap(tempArray[i], tempArray[i + 1])
            }
        }
    }
}

function sortTempArrayBySensor(tempArray, ascending) {
    if (ascending) {
        for (let i = 0; i < tempArray.length; ++i) {
            if (tempArray[i].sensor === 'Intérieur' && tempArray[i + 1].sensor === 'Extérieur') {
                swap(tempArray[i], tempArray[i + 1])
            }
        }
    } else {
        for (let i = 0; i < tempArray.length; ++i) {
            if (tempArray[i + 1].sensor === 'Intérieur' && tempArray[i].sensor === 'Extérieur') {
                swap(tempArray[i], tempArray[i + 1])
            }
        }
    }
}

function sortTempArrayByDate(tempArray, ascending) {
    if (ascending) {
        for (let i = 0; i < tempArray.length; ++i) {
            if (tempArray[i].date < tempArray[i + 1].date) {
                swap(tempArray[i], tempArray[i + 1]);
            }
        }
    } else {
        for (let i = 0; i < tempArray.length; ++i) {
            if (tempArray[i].date < tempArray[i + 1].date) {
                swap(tempArray[i], tempArray[i + 1]);
            }
        }
    }
}
