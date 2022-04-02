import Subject from "./Subject.js";

class Sensors extends Subject {
    constructor() {
        super();

        this.socket = null;

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

    socket() {
        this.socket = new WebSocket("wss://ws.hothothot.dog:9502");

        this.socket.onopen = () => {
            this.socket.send('hello world');
        };

        this.socket.onmessage = function(event) {
            let json = JSON.parse(event.data);

            this.state = json.capteurs;

            this.notify();
        };
    }
}

export default Sensors;