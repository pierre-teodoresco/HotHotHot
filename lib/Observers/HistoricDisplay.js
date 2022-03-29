import Observer from "./Observer.js";

class HistoricDisplay extends Observer {
    constructor() {
        super();

        this.historicTableBody = document.querySelector('#historic tbody');
        this.tableEntryTemplate = document.querySelector('#entry-template');
    }

    update(data) {
        data.state.forEach(sensor => {
            let clonedRow = document.importNode(this.tableEntryTemplate.content, true);

            let cells = clonedRow.querySelectorAll('td');

            cells[0].innerText = sensor.Valeur + '°C';
            cells[1].innerText = sensor.Nom;
            cells[2].innerText = new Date().toLocaleString();

            this.historicTableBody.append(clonedRow);
        });
    }
}

export default HistoricDisplay;