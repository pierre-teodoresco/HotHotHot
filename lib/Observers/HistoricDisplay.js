import Observer from "./Observer.js";

class HistoricDisplay extends Observer {
    constructor() {
        super();
        
        this.historicTable = document.querySelector('#historic tbody');
        this.tableEntryTemplate = document.querySelector('#entry-template');
    }

    update(data) {
        data.state.forEach(sensor => {
            let clonedRow = document.importNode(this.tableEntryTemplate.content, true);

            let cells = clonedRow.querySelectorAll('td');

            cells[0].innerText = sensor.Valeur + '°C';
            cells[1].innerText = sensor.Nom;
            cells[2].innerText = new Date().toLocaleString();

            let tableBody = document.querySelector('#historic table tbody');
            tableBody.append(clonedRow);
        });


    }
}

export default HistoricDisplay;