import Observer from "./Observer.js";

class Pagination extends Observer {
    constructor() {
        super();

        this.entriesPerPage = 5;
        this.currentPage = 0;
        this.totalPages = 1;

        this.pageButtonsSpan = document.getElementById('page-buttons');
        this.pageButtonTemplate = document.getElementById('page-button-template');

        this.historicTableBody = document.querySelector('#historic tbody');

        this.currentPageSpan = document.getElementById('current-page');
        this.totalPagesSpan = document.getElementById('total-pages');
    }

    addPage(number) {
        let clonedButton = document.importNode(this.pageButtonTemplate.content, true).querySelector('button');

        clonedButton.value = number;

        clonedButton.innerHTML = number + 1;

        this.pageButtonsSpan.append(clonedButton);

        this.totalPagesSpan.innerText = number + 1;

        ++this.totalPages;
    }

    displayPage(number) {
        this.currentPage = number;

        this.currentPageSpan.innerText = parseInt(number) + 1;

        let entries = [];
        for (let i = 1; i < this.historicTableBody.children.length; i++) {
            entries.push(this.historicTableBody.children[i]);
        }

        let start = number * this.entriesPerPage;
        let end = start + this.entriesPerPage;

        for (let i = 0; i < entries.length; ++i) {
            if (i >= start && i < end) {
                entries[i].removeAttribute('class');
            } else {
                entries[i].setAttribute('class', 'hiddendiv');
            }
        }
    }

    /**
     * @param {Subject} data subject with the page that was selected represented by an integer
     */
    update(data) {
        if (data.constructor.name === 'Sensors') {
            if (this.historicTableBody.children.length > parseInt(this.totalPages * this.entriesPerPage + 1)) {
                this.addPage(this.totalPages);
            }
            this.displayPage(this.currentPage);
        } else {
            console.log(data.state);
            this.displayPage(data.state);
        }
    }
}

export default Pagination;