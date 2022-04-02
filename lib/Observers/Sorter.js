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

    /**
     * @param {Subject} data subject with the page that was selected represented by an integer
     */
    update(data) {
        if (data.constructor.name === "SortButtons") {
            let sortBy = data.state.isSortedBy;
            let direction = data.state.direction;

            if (sortBy === "temp") {
                console.log("sorting by temperature", direction);
                this.lastDirection = data.state.direction;
                this.lastSort = data.state.isSortedBy;
                this.sortByTemperature(direction);
            }
        } else if (data.constructor.name === "TableEntries"){
            if (this.lastSort === "temp") {
                this.sortByTemperature(this.lastDirection);
            } else if (this.lastSort === "date") {
                this.sortByDate(this.lastDirection);
            } else if (this.lastSort === "sensor") {
                this.sortBySensor(this.lastDirection);
            }
        }

        this._callback.notify();
    }

    updateTable(arr) {
        // delete all children of this.historicTableBody except the first one
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