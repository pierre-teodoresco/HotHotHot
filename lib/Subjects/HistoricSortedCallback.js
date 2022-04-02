import Subject from "./Subject.js";

class HistoricSortedCallback extends Subject {
    constructor() {
        super();

    }

    onHistoricSorted() {
        this.notify();
    }
}

export default HistoricSortedCallback;