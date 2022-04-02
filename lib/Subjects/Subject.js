class Subject {
    state = {}
    observers = []

    constructor() {

    }

    attach(observer) {
        this.observers.push(observer);
    }

    detach(observer) {
        const index = this.observers.indexOf(observer);

        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify() {
        this.observers.forEach(observer => observer.update(this));
    }
}

export default Subject;