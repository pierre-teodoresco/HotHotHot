class App {
    constructor(selector) {
        this.appElement = document.querySelector(selector);
        this.components = {};
    }

    addComponent(component) {
        this.components[component.name] = component;
    }

    showComponent(name) {
        this.currentComponent = this.components[name];
        this.updateView();
    }

    updateView() {
        if (this.currentComponent) {
            this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model);
        }
    }
}

export default App;