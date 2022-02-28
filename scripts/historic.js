function addEntryToHistory(temp) {
    let template = document.getElementById('entry-template');
    let clonedRow = document.importNode(template.content, true);

    let cells = clonedRow.querySelectorAll('td');
    cells[0].innerText = temp.val + '°C';
    cells[1].innerText = temp.sensor;
    cells[2].innerText = temp.date;

    let tableBody = document.querySelector('#historic table tbody');
    tableBody.append(clonedRow);
}

let state = "date-up";

function sortHandler() {
    document.getElementById("svg-date").src = "../svgs/historic/caret-up.svg";

    document.getElementById("link-date-sort").onclick = function() {
        if (state === "date-up") {
            document.getElementById("svg-date").src = "../svgs/historic/caret-down.svg";
            state = "date-down";
        } else {
            resetSvg();
            document.getElementById("svg-date").src = "../svgs/historic/caret-up.svg";
            state = "date-up";
        }
    }
    document.getElementById("link-lieu-sort").onclick = function() {
        if (state === "lieu-up") {
            document.getElementById("svg-lieu").src = "../svgs/historic/caret-down.svg";
            state = "lieu-down";
        } else {
            resetSvg();
            document.getElementById("svg-lieu").src = "../svgs/historic/caret-up.svg";
            state = "lieu-up";
        }
    }
    document.getElementById("link-temp-sort").onclick = function() {
        if (state === "temp-up") {
            document.getElementById("svg-temp").src = "../svgs/historic/caret-down.svg";
            state = "temp-down";
        } else {
            resetSvg();
            document.getElementById("svg-temp").src = "../svgs/historic/caret-up.svg";
            state = "temp-up";
        }
    }

}

function resetSvg() {
    document.getElementById("svg-temp").src = "";
    document.getElementById("svg-lieu").src = "";
    document.getElementById("svg-date").src = "";
}