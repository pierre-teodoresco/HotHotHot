import Subject from "./Subject.js";

class TableEntries extends Subject {
    constructor() {
        super();

    }

    onTableUpdated() {
        this.notify();
    }
}

export default TableEntries;