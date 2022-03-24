import Subject from "./Subject.js";

class Sensors extends Subject {
    constructor() {
        super();

        this.dataFetch(this);
        let interval = setInterval(this.dataFetch, 20000, ...[this]);
    }

    dataFetch(object) {
        fetch("https://hothothot.dog/api/capteurs").then(data => {
            data.json().then(json => {
                object.state = json.capteurs;
                object.notify();
            })
        })
    };

}

export default Sensors;