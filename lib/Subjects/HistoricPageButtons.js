import Subject from "./Subject.js";

class HistoricPageButtons extends Subject {
    constructor() {
        super();

        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById('page-buttons').addEventListener('click',
            event => {
                this.state = event.target.value;
                this.notify();
            });
    }

    onButtonAdded() {
        this.addEventListeners()
    }
}

export default HistoricPageButtons;