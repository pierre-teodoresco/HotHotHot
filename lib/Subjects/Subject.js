class Subject {
    state = {}
    observers = []

    constructor() {

    }

    attach(observer) {
        console.log('added an observer')
        this.observers.push(observer);
    }

    detach(observer) {
        console.log('removed an observer')
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