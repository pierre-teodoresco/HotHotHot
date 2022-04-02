import Subject from "./Subject.js";

class SortButtons extends Subject {
    constructor() {
        super();
        this.state.subject = "SortButtons";
        this.state.isSortedBy = "date";
        this.state.direction = "desc";

        document.querySelectorAll("#historic tbody a").forEach(button => {
            button.addEventListener("click", event => {
                if (this.state.isSortedBy === event.target.attributes.href.value.replace('#', '')) {
                    this.state.direction = this.state.direction === "desc" ? "asc" : "desc";
                }
                else {
                    this.state.direction = "desc";
                }

                this.state.isSortedBy = event.target.attributes.href.value.replace('#', '');


                this.notify();
            });
        })
    }
}

export default SortButtons;