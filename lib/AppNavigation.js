import Observer from "./Observer.js";

class AppNavigation extends Observer {
    update(data) {
        document.querySelectorAll(`#app section`)
            .forEach(section => section.removeAttribute('class'));

        document.querySelector(`#app #${data.state}`)
            .setAttribute('class', 'active');
    }
}

export default AppNavigation;