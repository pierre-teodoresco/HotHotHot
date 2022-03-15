import Subject from "./Subject.js";

class NavBar extends Subject {
    constructor() {
        super();

        document.querySelectorAll('nav a').forEach(button => {
                button.addEventListener('click', event => {
                    this.state = event.target.attributes.href.value.replace('#', '');
                    this.notify();
                })
            });
    }
}

export default NavBar