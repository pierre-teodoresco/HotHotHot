import Observer from "./Observer.js";

class HistoricSorter extends Observer {
    _callback;

    set callback(value) {
        this._callback = value;
    }

    constructor() {
        super();

        this.lastSort = "date";
        this.lastDirection = "desc";

        this.historicTableBody = document.querySelector('#historic tbody');
    }

    getEntries() {
        let entries = this.historicTableBody.children;

        let arr = [];

        for (let i = 1; i < entries.length; i++) {
            let entry = {
                temp: 0,
                sensor: 0,
                date: 0,
            }
            entry.temp = entries[i].children[0].innerHTML.replace("°C", "");
            entry.sensor = entries[i].children[1].innerHTML;
            entry.date = entries[i].children[2].innerHTML;
            arr.push(entry);
        }

        return arr;
    }

    sortByTemperature(direction) {
        let arr = this.getEntries();

        arr.sort((a, b) => {
            return b.temp - a.temp;
        });

        if (direction === "asc") {
            arr.reverse();
        }

        this.updateTable(arr);
    }

    sortByDate(direction) {
        let arr = this.getEntries();

        arr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        if (direction === "asc") {
            arr.reverse();
        }

        this.updateTable(arr);
    }

    sortBySensor(direction) {
        let arr = this.getEntries();

        arr.sort((a, b) => {
            return a.sensor.localeCompare(b.sensor);
        });

        if (direction === "asc") {
            arr.reverse();
        }

        this.updateTable(arr);
    }

    sort(sortBy, direction) {
        switch (sortBy) {
            case "temp":
                this.sortByTemperature(direction);
                break;
            case "date":
                this.sortByDate(direction);
                break;
            case "sensor":
                this.sortBySensor(direction);
                break;
        }
    }

    /**
     * @param {Subject} data subject with the page that was selected represented by an integer
     */
    update(data) {
        switch (data.constructor.name) {
            case "SortButtons":
                this.lastDirection = data.state.direction;
                this.lastSort = data.state.isSortedBy;
                this.sort(data.state.isSortedBy, data.state.direction);
                break;
            case "TableEntries":
                this.sort(this.lastSort, this.lastDirection);
                break;
        }

        this._callback.notify();
    }

    updateTable(arr) {
        while (this.historicTableBody.children.length > 1) {
            this.historicTableBody.removeChild(this.historicTableBody.lastChild);
        }

        arr.forEach(entry => {
            let row = document.createElement('tr');
            row.innerHTML += `<td>${entry.temp}°C</td>`;
            row.innerHTML += `<td>${entry.sensor}</td>`;
            row.innerHTML += `<td>${entry.date}</td>`;
            this.historicTableBody.appendChild(row);
        });
    }
}

export default HistoricSorter;