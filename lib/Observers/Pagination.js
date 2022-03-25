import Observer from "./Observer.js";

class Pagination extends Observer {
    constructor() {
        super();

        this.entriesPerPage = 5;

        this.currentPage = 1;
        this.totalPages = 1;

        this.pageButtonsSpan = document.getElementById('page-buttons');
        this.pageButtonTemplate = document.getElementById('page-button-template');

        this.historicTableBody = document.querySelector('#historic tbody');

        this.currentPageSpan = document.getElementById('current-page');
        this.totalPagesSpan = document.getElementById('total-pages');
    }

    addPage(number) {
        let clonedButton = document.importNode(this.pageButtonTemplate.content, true);

        clonedButton.value = number;
        clonedButton.innerHTML = number;

        this.pageButtonsSpan.append(clonedButton);

        this.totalPagesSpan.innerHTML = number;
    }

    /**
     * @param {Subject} data subject with the page that was selected represented by an integer
     */
    update(data) {
        if (data.constructor.name === 'Sensors') {
            if (this.historicTableBody.children.length - 1 > this.totalPages * 5) {
                this.addPage(this.totalPages + 1);
            }
        } else {
        }
    }
}

export default Pagination;