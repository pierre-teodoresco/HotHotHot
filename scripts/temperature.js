class Temperature {
    constructor(val, sensor, date) {
        this._val = val;
        this._sensor = sensor;
        this._date = date;
    };

    get val() {
        return this._val;
    }

    get sensor() {
        return this._sensor;
    }

    get date() {
        return this._date;
    }
}