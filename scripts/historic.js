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

function sortButton() {
    document.getElementById("svg-date").src = "../svgs/historic/caret-up.svg";

    let state = "date-up";
    document.getElementById("link-date-sort").onclick = function() {
        if (state === "date-up") {
            document.getElementById("svg-date").src = "../svgs/historic/caret-down.svg";
            state = "date-down";
        } else if (state === "date-down") {
            document.getElementById("svg-date").src = "../svgs/historic/caret-up.svg";
            state = "date-up";
        }
    }

}
sortButton()